import { NexusGenInputs, NexusGenRootTypes } from "../generated/nexus-typegen";

export function initTopicController(params: {
  firestore: FirebaseFirestore.Firestore;
}) {
  const { firestore } = params;

  async function getByCourseId(courseId: string) {
    const coursesRef = firestore.collection("courses").doc(courseId);

    const queryCourse = await coursesRef.get();

    if (!queryCourse.exists) {
      throw new Error(`There's no course with id ${courseId}`);
    }

    const queryTopics = await coursesRef.collection("topics").get();

    let topics: any = [];

    queryTopics.docs.map((doc) => {
      const topic = doc.data();

      topics.push({
        id: doc.id,
        active: topic.active,
        description: topic.description,
        lessonCount: topic.lessonCount,
        order: topic.order,
        thumbnail: topic.thumbnail,
        title: topic.title,
        courseId,
      });
    });

    return topics;
  }

  async function create(
    courseId: string,
    data: NexusGenInputs["CreateTopicInput"]
  ): Promise<NexusGenRootTypes["TopicType"]> {
    try {
      const coursesRef = firestore.collection("courses").doc(courseId);

      const queryCourse = await coursesRef.get();

      if (!queryCourse.exists) {
        throw new Error(`There's no course with id ${courseId}`);
      }

      const topicResponse = await coursesRef.collection("topics").add({
        ...data,
        active: false,
        thumbnail: "",
      });

      return {
        ...data,
        active: false,
        thumbnail: "",
        courseId,
        id: topicResponse.id,
      };
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function update(
    courseId: string,
    topicId: string,
    data: NexusGenInputs["UpdateTopicInput"]
  ): Promise<boolean> {
    try {
      const coursesRef = firestore.collection("courses").doc(courseId);

      const queryCourse = await coursesRef.get();

      if (!queryCourse.exists) {
        throw new Error(`There's no course with id ${courseId}`);
      }

      const topicsRef = coursesRef.collection("topics").doc(topicId);

      const queryTopics = await topicsRef.get();

      if (!queryTopics.exists) {
        throw new Error(`There's no topic with id ${topicId}`);
      }

      topicsRef.update({
        ...data,
      });

      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function remove(courseId: string, topicId: string): Promise<Boolean> {
    try {
      const coursesRef = firestore.collection("courses").doc(courseId);

      const queryCourse = await coursesRef.get();

      if (!queryCourse.exists) {
        throw new Error(`There's no course with id ${courseId}`);
      }

      const topicsRef = coursesRef.collection("topics").doc(topicId);

      const queryTopics = await topicsRef.get();

      if (!queryTopics.exists) {
        throw new Error(`There's no topic with id ${topicId}`);
      }

      await topicsRef.delete();

      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function order(
    courseId: string,
    topicsIds: string[]
  ): Promise<Boolean> {
    try {
      const coursesRef = firestore.collection("courses").doc(courseId);

      const queryCourse = await coursesRef.get();

      if (!queryCourse.exists) {
        throw new Error(`There's no course with id ${courseId}`);
      }

      topicsIds.map(async (topicId, index) => {
        const topicsRef = coursesRef.collection("topics").doc(topicId);

        const queryTopics = await topicsRef.get();

        if (!queryTopics.exists) {
          throw new Error(`There's no topic with id ${topicId}`);
        }

        topicsRef.update({
          order: index + 1,
        });
      });

      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  return {
    getByCourseId,
    create,
    update,
    remove,
    order,
  };
}
