import dayjs from "dayjs";
import { NexusGenInputs, NexusGenRootTypes } from "../generated/nexus-typegen";

export function initMenuController(params: {
  firestore: FirebaseFirestore.Firestore;
}) {
  const { firestore } = params;

  async function getMenuPageByPath(
    path: string
  ): Promise<NexusGenRootTypes["MenuType"]> {
    try {
      const querySnapshot = await firestore.doc(path).get();

      const data = querySnapshot.data();

      if (!querySnapshot.exists || !data)
        throw new Error(`There's no menu with ${path}`);

      const menu = {
        userId: data.userId,
        image: data.image,
        imageTitle: data.imageTitle,
        active: data.active,
        link: data.link,
        virtualAppId: "", //It needs to get this vApp
      };

      return menu;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function getMenuItemsByPath(
    path: string
  ): Promise<Array<NexusGenRootTypes["MenuItemType"]>> {
    try {
      const querySnapshot = await firestore.doc(path).collection("menu").get();

      const menus: Array<NexusGenRootTypes["MenuItemType"]> = [];

      querySnapshot.forEach((doc) => {
        const menu = doc.data();

        const type = menu.type === "page" ? 0 : menu.type === "course" ? 1 : 2;

        menus.push({
          active: menu.active,
          background: menu.background,
          description: menu.description,
          id: menu?.id || doc.id, //The ID that is coming can be from courseId or articleId, but pageType we get from doc
          menuId: doc.id,
          name: menu.name,
          order: menu.order,
          protected: menu.protected,
          type,
          userId: menu.userId,
          virtualAppId: menu.virtualAppId,
          thumbnail: menu.thumbnail,
          path: doc.ref.path,
        });
      });

      return menus;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function createMenuItems(
    path: string,
    datas: Array<NexusGenInputs["CreateMenuItem"]>
  ) {
    try {
      const menuRef = await firestore.doc(path).collection("menu");

      await Promise.all(
        datas.map(async (data) => {
          const type =
            data.type === 0 ? "page" : data.type === 1 ? "course" : "article";

          const response = await menuRef.add({ ...data, type });

          //If it is page type, it puts default id. On course, courseId and article, articleId.
          if (type === "page") {
            response.update({ id: response.id });
          }

          if (type === "course" && data.id) {
            let courseRef = await firestore.collection("courses").doc(data.id);

            let queryCourse = await courseRef.get();

            let course = queryCourse.data();

            if (!queryCourse.exists || !course)
              throw new Error(`There's no course with id ${data.id}`);

            if (course?.linkedMenu)
              courseRef.update("linkedMenu", [
                ...course?.linkedMenu,
                response.path,
              ]);
            else courseRef.update("linkedMenu", [response.path]);
          } else if (type === "article" && data.id) {
            let articleRef = await firestore
              .collection("Articles")
              .doc(data.id);

            let queryArticle = await articleRef.get();

            let article = queryArticle.data();

            if (!queryArticle.exists || !article)
              throw new Error(`There's no article with id ${data.id}`);

            if (article?.linkedMenu)
              articleRef.update("linkedMenu", [
                ...article?.linkedMenu,
                response.path,
              ]);
            else articleRef.update("linkedMenu", [response.path]);
          }
        })
      );

      updatePageActive(path);
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function removeMenuItem(path: string) {
    try {
      const menuRef = await firestore.doc(path);

      const queryMenu = await menuRef.get();

      const menu = queryMenu.data();

      if (!queryMenu.exists || !menu) {
        throw new Error(`There's no menu item with id ${menuRef}`);
      }

      if (menu.type === "article") {
        const articleRef = firestore.collection("Articles").doc(menu.id);

        const queryArticle = await articleRef.get();

        const article = queryArticle.data();

        if (!queryArticle.exists || !article) {
          throw new Error(`There's no article with id ${menu.id}`);
        }

        if (article.linkedMenu) {
          const newLinkedMenu = (article.linkedMenu as string[])?.filter(
            (lm) => path !== lm
          );

          articleRef.update({
            linkedMenu: newLinkedMenu,
            updatedAt: dayjs().valueOf(),
          });
        }
      } else if (menu.type === "course") {
        const coursesRef = firestore.collection("courses").doc(menu.id);

        const queryCourse = await coursesRef.get();

        const course = queryCourse.data();

        if (!queryCourse.exists || !course) {
          throw new Error(`There's no course with id ${menu.id}`);
        }

        if (course.linkedMenu) {
          const newLinkedMenu = (course.linkedMenu as string[])?.filter(
            (lm) => path !== lm
          );

          coursesRef.update({
            linkedMenu: newLinkedMenu,
            updatedAt: dayjs().valueOf(),
          });
        }
      }

      menuRef.delete();
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function orderMenuItems(
    path: string,
    menuItemsIds: string[]
  ): Promise<Boolean> {
    try {
      const menuRef = await firestore.doc(path).collection("menu");

      menuItemsIds.map(async (menuItemId, index) => {
        const menuItemRef = menuRef.doc(menuItemId);

        const queryMenu = await menuItemRef.get();

        const menu = queryMenu.data();

        if (!queryMenu.exists || !menu) {
          throw new Error(`There's no menu item with id ${menuItemId}`);
        }

        menuItemRef.update({
          order: index + 1,
        });
      });

      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function updateMenuItem(
    path: string,
    data: NexusGenInputs["UpdateMenuItem"]
  ): Promise<Boolean> {
    try {
      const menuRef = await firestore.doc(path);

      const queryMenu = await menuRef.get();

      const menu = queryMenu.data();

      if (!queryMenu.exists || !menu) {
        throw new Error(`There's no menu item with path ${path}`);
      }

      menuRef.update({ ...data });

      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  //Check if this menu page is gonna be actived or not actived
  async function updatePageActive(path: string): Promise<Boolean> {
    try {
      const menuRef = await firestore.doc(path).collection("menu");

      let menuActived = false;

      const queryMenu = await menuRef.get();

      queryMenu.docs.forEach((doc) => {
        const menuItem = doc.data();

        if (menuItem?.active) menuActived = true;
      });

      const pageUpdateRef = await firestore.doc(path);

      const queryPageUpdate = await pageUpdateRef.get();

      const page = queryPageUpdate.data();

      if (!queryPageUpdate.exists || !page) {
        throw new Error(`There's no menu item with path ${path}`);
      }

      pageUpdateRef.update({ active: menuActived });
      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }
  return {
    getMenuPageByPath,
    getMenuItemsByPath,
    createMenuItems,
    removeMenuItem,
    orderMenuItems,
    updateMenuItem,
  };
}
