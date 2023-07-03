import dayjs from "dayjs";
import { NexusGenInputs, NexusGenRootTypes } from "../generated/nexus-typegen";

export function initCourseController(params: {
  firestore: FirebaseFirestore.Firestore;
}) {
  const { firestore } = params;

  function createCourseObject(
    course: FirebaseFirestore.DocumentData,
    id: string
  ): NexusGenRootTypes["CourseType"] {
    return {
      id,
      userId: course.userId,
      tagId: course?.tagIDs[0],
      virtualAppId: course?.virtualAppIds[0],
      name: course.name,
      description: course.description,
      active: course.active,
      commentType: course.commentType,
      courseAlerts: course.courseAlerts,
      restrictionType: course.restrictionType,
      protected: course.protected,
      createdAt: course.createdAt,
      defaultImage: course?.defaultImage,
      courseImage: course?.courseImage,
      thumbnail: course?.thumbnail,
      lessonCount: course?.lessonCount,
      courseVideosCount: course?.courseVideosCount,
      showOrderNumber: course?.showOrderNumber || false,
    };
  }

  async function findeOne(
    courseId: string
  ): Promise<NexusGenRootTypes["CourseType"]> {
    try {
      let queryCourse = await firestore
        .collection("courses")
        .doc(courseId)
        .get();

      let course = queryCourse.data();

      if (!queryCourse.exists || !course)
        throw new Error(`There's no course with id ${courseId}`);

      return createCourseObject(course, queryCourse.id);
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function getByUserId(
    userId: string
  ): Promise<Array<NexusGenRootTypes["CourseType"]>> {
    try {
      const coursesRef = firestore.collection("courses");

      const firebaseCourses = coursesRef.where("userId", "==", userId);

      const querySnapshot = await firebaseCourses.get();

      if (querySnapshot.docs.length === 0) return [];

      let courses = [] as NexusGenRootTypes["CourseType"][];

      querySnapshot.forEach((doc) => {
        const course = doc.data();

        courses.push(createCourseObject(course, doc.id));
      });

      return courses;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function getByVirtualAppId(
    virtualAppId: string
  ): Promise<Array<NexusGenRootTypes["CourseType"]>> {
    try {
      const coursesRef = firestore.collection("courses");

      const firebaseCourses = coursesRef.where(
        "virtualAppIds",
        "array-contains",
        virtualAppId
      );

      const querySnapshot = await firebaseCourses.get();

      let courses = [] as NexusGenRootTypes["CourseType"][];

      querySnapshot.forEach((doc) => {
        const course = doc.data();

        courses.push(createCourseObject(course, doc.id));
      });

      return courses;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function create(
    data: NexusGenInputs["CreateCourseInput"]
  ): Promise<NexusGenRootTypes["CourseType"]> {
    try {
      const coursesRef = firestore.collection("courses");

      const vAppRef = firestore
        .collection("clients")
        .doc(data.virtualAppIds[0]);

      //Create a tagId to this course. It gets the biggest tagId and increase one more value
      const queryTagsVapp = await vAppRef
        .collection("Tags")
        .orderBy("id", "desc")
        .limit(1)
        .get();

      let tagId = 1;

      queryTagsVapp.docs.map((doc) => {
        if (doc.exists) {
          tagId = doc.data().id + 1;
        }
      });

      const newCourseObjt = {
        ...data,
        topicCount: 0,
        lessonCount: 0,
        totalTrainingHours: 0,
        published: false,
        createdAt: dayjs().valueOf(),
        updatedAt: dayjs().valueOf(),
        tagIDs: [tagId],
      };

      const courseResponse = await coursesRef.add(newCourseObjt);

      vAppRef.collection("Tags").add({
        active: false,
        assigned_users_count: 0,
        category_id: 1,
        category_name: "course",
        createdAt: dayjs().valueOf(),
        id: tagId,
        name: data.name,
        notes: data.description,
      });

      //After create a course, we create one default topic and lesson
      const topicResponse = await coursesRef
        .doc(courseResponse.id)
        .collection("topics")
        .add({
          title: "Untitled Topic",
          description: "Nondescript Topic",
          thumbnail: "",
          active: false,
          order: 1,
        });

      const lessonResponse = await coursesRef
        .doc(courseResponse.id)
        .collection("topics")
        .doc(topicResponse.id)
        .collection("lessons")
        .add({
          title: "Untitled Lesson",
          active: false,
          description: "Nondescript Lesson",
          thumbnail:
            "https://firebasestorage.googleapis.com/v0/b/cloud-firestore-poc-ad418.appspot.com/o/android%2FlessonThumbnails%2Fview-of-times-square-at-night.png?alt=media&token=f09c1d23-92b2-4f63-a62f-686a991c2a4a",
          contenttype: "text",
          order: 1,
          subtitle: "",
          virtualAppIds: data.virtualAppIds,
        });

      const newCourse = createCourseObject(newCourseObjt, courseResponse.id);

      return newCourse;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function update(
    data: NexusGenInputs["UpdateCourseInput"]
  ): Promise<Boolean> {
    try {
      const coursesRef = firestore.collection("courses").doc(data.courseId);

      const queryCourse = await coursesRef.get();

      const course = queryCourse.data();

      if (!queryCourse.exists || !course) {
        throw new Error(`There's no course with id ${data.courseId}`);
      }

      const vAppRef = firestore
        .collection("clients")
        .doc(data.course.virtualAppIds[0]);

      const queryTagsVapp = await vAppRef
        .collection("Tags")
        .where("id", "==", parseInt(course.tagIDs[0]))
        .get();

      queryTagsVapp.docs[0].ref.update({
        name: data.course.name,
        notes: data.course.description,
      });

      coursesRef.update({
        ...data.course,
        updatedAt: dayjs().valueOf(),
      });

      if (course.linkedMenu) {
        (course.linkedMenu as string[])?.forEach(async (lm) => {
          if (!(await firestore.doc(lm).get()).exists) return;

          if (course.active === true) {
            firestore.doc(lm).update({
              thumbnail: data.course.thumbnail,
              name: data.course.name,
              active: data.course.active,
              description: data.course.description,
              protected: data.course.protected,
              restrictionType: data.course.protected === true ? 1 : 0,
            });
          } else {
            firestore.doc(lm).delete();
          }
        });
      }

      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function remove(courseId: string): Promise<Boolean> {
    try {
      const coursesRef = firestore.collection("courses").doc(courseId);

      const queryCourse = await coursesRef.get();

      const course = queryCourse.data();

      if (!queryCourse.exists || !course) {
        throw new Error(`There's no course with id ${courseId}`);
      }

      if (course.linkedMenu) {
        (course?.linkedMenu as string[])?.forEach(async (lm) => {
          firestore.doc(lm).delete();
        });
      }

      await coursesRef.delete();

      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  return { findeOne, getByUserId, getByVirtualAppId, create, update, remove };
}
