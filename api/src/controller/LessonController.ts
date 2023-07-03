import { NexusGenInputs, NexusGenRootTypes } from "../generated/nexus-typegen";
import { s3 } from "../services/S3Service";

export function initLessonController(params: {
  firestore: FirebaseFirestore.Firestore;
}) {
  const { firestore } = params;

  async function getByCourseTopic(
    courseId: string,
    topicId: string
  ): Promise<Array<NexusGenRootTypes["LessonType"]>> {
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

      const queryLessons = await topicsRef.collection("lessons").get();

      let lessons: Array<NexusGenRootTypes["LessonType"]> = [];

      queryLessons.docs.map((doc) => {
        const lesson = doc.data();

        let signedUrl = lesson.mediaUrl;

        if (lesson.mediaUrl && !lesson.mediaUrl.includes("firebasestorage")) {
          const signedUrlExpireSeconds = 60 * 60;

          signedUrl = s3.getSignedUrl("getObject", {
            Bucket: "learnistic-p1",
            Key: lesson.mediaUrl.replace(
              "https://learnistic-p1.s3.us-east-2.amazonaws.com/",
              ""
            ),
            Expires: signedUrlExpireSeconds,
          });
        }

        lessons.push({
          id: doc.id,
          topicId,
          active: lesson.active,
          description: lesson.description,
          order: lesson.order,
          thumbnail: lesson.thumbnail || "",
          title: lesson.title,
          mediaUrl: signedUrl || "",
          contenttype: lesson.contenttype,
        });
      });

      return lessons;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function create(
    courseId: string,
    topicId: string,
    data: NexusGenInputs["CreateLessonInput"]
  ): Promise<NexusGenRootTypes["LessonType"]> {
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

      const lessonsResponse = await topicsRef.collection("lessons").add({
        ...data,
        active: data?.active || false,
        thumbnail:
          data?.thumbnail ||
          "https://firebasestorage.googleapis.com/v0/b/learnistic-production.appspot.com/o/dxVMNixAfHg43x7lShUTu5zyZAc2%2Flesson%2F02wnTGLM8qkq9sC9m4Uq?alt=media&token=2beaa12a-615e-496e-8c13-9e986c5ea9ad",
        contenttype: data?.contenttype || "text",
        subtitle: "",
        mediaUrl: data?.mediaUrl || "",
      });

      let lessonCount = (queryCourse.data()?.lessonCount as number) || 0;

      lessonCount += 1;

      const currentDate = new Date();

      await coursesRef.update({
        lessonCount,
        contentUpdatedAt: currentDate.getTime(),
      });

      return {
        ...data,
        active: data?.active || false,
        thumbnail:
          data?.thumbnail ||
          "https://firebasestorage.googleapis.com/v0/b/learnistic-production.appspot.com/o/dxVMNixAfHg43x7lShUTu5zyZAc2%2Flesson%2F02wnTGLM8qkq9sC9m4Uq?alt=media&token=2beaa12a-615e-496e-8c13-9e986c5ea9ad",
        contenttype: data?.contenttype || "text",
        mediaUrl: data?.mediaUrl || "",
        id: lessonsResponse.id,
        topicId,
      };
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function createByVideoUploading(
    courseId: string,
    topicId: string,
    data: NexusGenInputs["CreateLessonInput"]
  ): Promise<NexusGenRootTypes["LessonType"]> {
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

      const lessonsResponse = await firestore
        .doc(`temporaryUpload/${courseId}/topics/${topicId}`)
        .collection("lessons")
        .add({
          ...data,
          active: data?.active || false,
          thumbnail:
            data?.thumbnail ||
            "https://firebasestorage.googleapis.com/v0/b/learnistic-production.appspot.com/o/dxVMNixAfHg43x7lShUTu5zyZAc2%2Flesson%2F02wnTGLM8qkq9sC9m4Uq?alt=media&token=2beaa12a-615e-496e-8c13-9e986c5ea9ad",
          contenttype: data?.contenttype || "text",
          subtitle: "",
          mediaUrl: data?.mediaUrl || "",
        });

      let lessonCount = (queryCourse.data()?.lessonCount as number) || 0;

      lessonCount += 1;

      const currentDate = new Date();

      await coursesRef.update({
        lessonCount,
        contentUpdatedAt: currentDate.getTime(),
      });

      return {
        ...data,
        active: data?.active || false,
        thumbnail:
          data?.thumbnail ||
          "https://firebasestorage.googleapis.com/v0/b/learnistic-production.appspot.com/o/dxVMNixAfHg43x7lShUTu5zyZAc2%2Flesson%2F02wnTGLM8qkq9sC9m4Uq?alt=media&token=2beaa12a-615e-496e-8c13-9e986c5ea9ad",
        contenttype: data?.contenttype || "text",
        mediaUrl: data?.mediaUrl || "",
        id: lessonsResponse.id,
        topicId,
      };
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function updateByVideoUploading(
    courseId: string,
    topicId: string,
    lessonId: string,
    data: NexusGenInputs["UpdateLessonInput"]
  ): Promise<Boolean> {
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

      const lessonRef = await firestore.doc(
        `temporaryUpload/${courseId}/topics/${topicId}/lessons/${lessonId}`
      );

      await lessonRef.update({
        ...data,
      });

      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function update(
    courseId: string,
    topicId: string,
    lessonId: string,
    data: NexusGenInputs["UpdateLessonInput"]
  ): Promise<Boolean> {
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

      const lessonRef = topicsRef.collection("lessons").doc(lessonId);

      const queryLesson = await lessonRef.get();

      if (!queryLesson.exists) {
        throw new Error(`There's no lesson with id ${lessonId}`);
      }

      await lessonRef.update({
        ...data,
      });

      const currentDate = new Date();

      await coursesRef.update({
        contentUpdatedAt: currentDate.getTime(),
      });

      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function remove(
    courseId: string,
    topicId: string,
    lessonId: string
  ): Promise<Boolean> {
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

      const lessonRef = topicsRef.collection("lessons").doc(lessonId);

      const queryLesson = await lessonRef.get();

      if (!queryLesson.exists) {
        throw new Error(`There's no lesson with id ${lessonId}`);
      }

      const deletedLesson = await lessonRef.delete();

      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function order(
    courseId: string,
    topicId: string,
    lessonsIds: string[]
  ): Promise<Boolean> {
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

      lessonsIds.map(async (lessonId, index) => {
        const lessonRef = topicsRef.collection("lessons").doc(lessonId);

        const queryLesson = await lessonRef.get();

        if (!queryLesson.exists) {
          throw new Error(`There's no lesson with id ${lessonId}`);
        }

        lessonRef.update({
          order: index + 1,
        });
      });

      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function initEncodeVideo(data: {
    courseId: string;
    topicId: string;
    lessonId: string;
    fileId: string;
    virtualAppId: string;
    filePath: string;
    fileName: string;
    userUid: string;
    createdAt: string;
    fileSize: number;
    fileDuration: number;
    status: string;
  }) {
    try {
      await firestore.doc(`encodeLessonMap/${data.fileId}`).set({
        courseId: data.courseId,
        topicId: data.topicId,
        lessonId: data.lessonId,
        virtualAppId: data.virtualAppId,
        filePath: data.filePath,
        fileName: data.fileName,
        userUid: data.userUid,
        createdAt: data.createdAt,
        fileSize: data.fileSize,
        fileDuration: data.fileDuration,
        status: data.status,
      });

      const courseRef = firestore.doc(`course/${data.courseId}`);

      const currentDate = new Date();

      await courseRef.update({ contentUpdatedAt: currentDate.getTime() });

      return true;
    } catch (err) {
      return false;
    }
  }

  async function getVideosLessonByVirtualAppId(virtualAppId: string) {
    try {
      const encodeLessonMap = await firestore
        .collection("encodeLessonMap")
        .where("virtualAppId", "==", virtualAppId)
        .get();

      if (encodeLessonMap.docs.length === 0) return [];

      let videos = (
        await Promise.all(
          encodeLessonMap.docs.map(async (doc) => {
            const video = doc.data();

            let lesson = (
              await firestore
                .doc(
                  `courses/${video.courseId}/topics/${video.topicId}/lessons/${video.lessonId}`
                )
                .get()
            ).data();

            if (!lesson) {
              lesson = (
                await firestore
                  .doc(
                    `temporaryUpload/${video.courseId}/topics/${video.topicId}/lessons/${video.lessonId}`
                  )
                  .get()
              ).data();
            }

            if (!lesson) return false;

            let course = (
              await firestore.doc(`courses/${video.courseId}`).get()
            ).data();

            return {
              id: doc.id,
              filePath: video.filePath,
              fileName: video.fileName,
              fileSize: video.fileSize,
              fileDuration: video.fileDuration,
              fileExtension: video.fileExtension,
              virtualAppId: video.virtualAppId,
              courseId: video.courseId,
              topicId: video.topicId,
              lessonId: video.lessonId,
              courseName: course?.name || "",
              lessonName: lesson?.title || "",
              createdAt: video.createdAt,
              status: video.status,
            };
          })
        )
      ).filter((result) => result);

      return videos;
    } catch (e) {
      return [];
    }
  }

  async function uploadVideoLesson(fileId: string, status: string) {
    try {
      await firestore.doc(`encodeLessonMap/${fileId}`).update({ status });
      return true;
    } catch (e) {
      return false;
    }
  }

  return {
    getByCourseTopic,
    create,
    update,
    remove,
    order,
    initEncodeVideo,
    getVideosLessonByVirtualAppId,
    uploadVideoLesson,
    createByVideoUploading,
    updateByVideoUploading,
  };
}
