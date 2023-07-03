import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AddressInput = {
  userAddress: Scalars['String'];
  userCity: Scalars['String'];
  userCountry: Scalars['String'];
  userState: Scalars['String'];
  userZipCode: Scalars['String'];
};

export type AddressType = {
  __typename?: 'AddressType';
  userAddress?: Maybe<Scalars['String']>;
  userCity?: Maybe<Scalars['String']>;
  userCountry?: Maybe<Scalars['String']>;
  userState?: Maybe<Scalars['String']>;
  userZipCode?: Maybe<Scalars['String']>;
};

export type ArticleType = {
  __typename?: 'ArticleType';
  active: Scalars['Boolean'];
  articleMinutes: Scalars['Float'];
  articleType: ArticleTypeEnum;
  author: Scalars['String'];
  createdAt?: Maybe<Scalars['Int']>;
  description: Scalars['String'];
  id: Scalars['String'];
  image: Scalars['String'];
  isHtml?: Maybe<Scalars['Boolean']>;
  mediaUrl: Scalars['String'];
  name: Scalars['String'];
  protected: Scalars['Boolean'];
  publishDate: Scalars['DateTime'];
  restrictionType: Scalars['Int'];
  tagIDs: Array<Maybe<Scalars['Int']>>;
  text: Scalars['String'];
  thumbnail: Scalars['String'];
  userId: Scalars['String'];
  videoThumbnail: Scalars['String'];
  virtualApp?: Maybe<VirtualAppType>;
  virtualAppId: Scalars['String'];
};

export enum ArticleTypeEnum {
  Audio = 'AUDIO',
  Empty = 'EMPTY',
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type AuthType = {
  __typename?: 'AuthType';
  userIdToken: Scalars['String'];
};

export type AutocompleteOption = {
  __typename?: 'AutocompleteOption';
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export enum BottomBarTypeEnum {
  DarkTheme = 'DARK_THEME',
  LightTheme = 'LIGHT_THEME',
  MediumTheme = 'MEDIUM_THEME',
  TitleColor = 'TITLE_COLOR'
}

export type ContactType = {
  __typename?: 'ContactType';
  active?: Maybe<Scalars['Boolean']>;
  billingAddress: AddressType;
  contactId?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  shippingAddress: AddressType;
  userEmail?: Maybe<Scalars['String']>;
  userFirstName?: Maybe<Scalars['String']>;
  userImage?: Maybe<Scalars['String']>;
  userLastName?: Maybe<Scalars['String']>;
  userMobile?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  userNotes?: Maybe<Scalars['String']>;
  userType?: Maybe<UserTypeEnum>;
};

export type CourseType = {
  __typename?: 'CourseType';
  active: Scalars['Boolean'];
  author?: Maybe<UserType>;
  commentType: Scalars['Int'];
  courseAlerts: Scalars['Int'];
  courseImage?: Maybe<Scalars['String']>;
  courseVideosCount?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  defaultImage?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['String'];
  lessonCount?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  protected: Scalars['Boolean'];
  restrictionType: Scalars['Int'];
  showOrderNumber: Scalars['Boolean'];
  tagId: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
  virtualApp?: Maybe<VirtualAppType>;
  virtualAppId: Scalars['String'];
};

export type CreateArticleInput = {
  active: Scalars['Boolean'];
  articleMinutes: Scalars['Float'];
  articleType: ArticleTypeEnum;
  author: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  isHtml?: Maybe<Scalars['Boolean']>;
  mediaUrl: Scalars['String'];
  name: Scalars['String'];
  protected: Scalars['Boolean'];
  publishDate: Scalars['DateTime'];
  restrictionType: Scalars['Int'];
  tagIDs: Array<Maybe<Scalars['Int']>>;
  text: Scalars['String'];
  thumbnail: Scalars['String'];
  userId: Scalars['String'];
  videoThumbnail: Scalars['String'];
  virtualAppIds: Array<Maybe<Scalars['String']>>;
};

export type CreateContactInput = {
  active: Scalars['Boolean'];
  billingAddress: AddressInput;
  countryCode: Scalars['String'];
  shippingAddress: AddressInput;
  userEmail: Scalars['String'];
  userEmailVerified?: Maybe<Scalars['Boolean']>;
  userFirstName: Scalars['String'];
  userLastName: Scalars['String'];
  userMobile: Scalars['String'];
  userName: Scalars['String'];
  userNotes: Scalars['String'];
  userType: UserTypeEnum;
};

export type CreateCourseInput = {
  active: Scalars['Boolean'];
  commentType: Scalars['Int'];
  courseAlerts: Scalars['Int'];
  courseImage: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
  protected: Scalars['Boolean'];
  restrictionType: Scalars['Int'];
  showOrderNumber: Scalars['Boolean'];
  thumbnail: Scalars['String'];
  userId: Scalars['String'];
  virtualAppIds: Array<Scalars['String']>;
};

export type CreateLessonInput = {
  active?: Maybe<Scalars['Boolean']>;
  contenttype?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  lessonMinutes?: Maybe<Scalars['Float']>;
  mediaUrl?: Maybe<Scalars['String']>;
  order: Scalars['Int'];
  thumbnail?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  virtualAppIds: Array<Maybe<Scalars['String']>>;
};

export type CreateMenuItem = {
  active: Scalars['Boolean'];
  background: Scalars['Boolean'];
  description: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  order: Scalars['Int'];
  protected: Scalars['Boolean'];
  restrictionType?: Maybe<Scalars['Int']>;
  tagIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  thumbnail: Scalars['String'];
  type: MenuItemTypeEnum;
  userId: Scalars['String'];
  virtualAppIds: Array<Scalars['String']>;
};

export type CreateTopicInput = {
  description: Scalars['String'];
  order: Scalars['Int'];
  title: Scalars['String'];
};

export type CreateVirtualAppInput = {
  activationLink: Scalars['String'];
  appOwnerName: Scalars['String'];
  backgroundColor: Scalars['String'];
  ctaColor: Scalars['String'];
  highlightColor: Scalars['String'];
  logo: Scalars['String'];
  name: Scalars['String'];
  titleBarColor: Scalars['String'];
};

export type FileType = {
  __typename?: 'FileType';
  downloadLink?: Maybe<Scalars['String']>;
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
};

export enum ImageFileType {
  Banner = 'BANNER',
  Icon = 'ICON'
}

export type LessonType = {
  __typename?: 'LessonType';
  active: Scalars['Boolean'];
  contenttype: Scalars['String'];
  currentChunkProcess?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  encodeFileId?: Maybe<Scalars['String']>;
  fileMediaId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lessonMinutes?: Maybe<Scalars['Float']>;
  maxChunkProcess?: Maybe<Scalars['String']>;
  mediaUrl: Scalars['String'];
  order: Scalars['Int'];
  thumbnail: Scalars['String'];
  title: Scalars['String'];
  topicId: Scalars['String'];
  transcodingStatus?: Maybe<Scalars['String']>;
  videoNeedsTranscoder?: Maybe<Scalars['Boolean']>;
};

export type MediaManagerType = {
  __typename?: 'MediaManagerType';
  actived: Scalars['Boolean'];
  extension: Scalars['String'];
  filePath: Scalars['String'];
  fileUrl: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  thumbVideoUrl?: Maybe<Scalars['String']>;
  type: MediaManagerTypeEnum;
  virtualAppId: Scalars['String'];
};

export enum MediaManagerTypeEnum {
  Audio = 'AUDIO',
  Document = 'DOCUMENT',
  Image = 'IMAGE',
  Pdf = 'PDF',
  Video = 'VIDEO'
}

export type MenuItemType = {
  __typename?: 'MenuItemType';
  active?: Maybe<Scalars['Boolean']>;
  background?: Maybe<Scalars['Boolean']>;
  description: Scalars['String'];
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  menuId: Scalars['String'];
  name: Scalars['String'];
  order: Scalars['Int'];
  path: Scalars['String'];
  protected?: Maybe<Scalars['Boolean']>;
  thumbnail: Scalars['String'];
  type: MenuItemTypeEnum;
  userId: Scalars['String'];
  virtualAppId: Scalars['String'];
};

export enum MenuItemTypeEnum {
  Article = 'ARTICLE',
  Course = 'COURSE',
  Page = 'PAGE'
}

export type MenuType = {
  __typename?: 'MenuType';
  active?: Maybe<Scalars['Boolean']>;
  image?: Maybe<Scalars['String']>;
  imageTitle?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
  virtualAppId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  checkPhone?: Maybe<Scalars['Boolean']>;
  completeTestDriveSignUp?: Maybe<Scalars['Boolean']>;
  createArticle?: Maybe<ArticleType>;
  createContact?: Maybe<Scalars['Boolean']>;
  createCourse?: Maybe<CourseType>;
  createLesson?: Maybe<LessonType>;
  createLessonByVideoUploading?: Maybe<LessonType>;
  createMedia?: Maybe<Scalars['Boolean']>;
  createMenuItems?: Maybe<Scalars['Boolean']>;
  createTopic?: Maybe<TopicType>;
  deleteContact?: Maybe<Scalars['Boolean']>;
  deleteMultipleContacts?: Maybe<Scalars['Boolean']>;
  initEncodeVideo?: Maybe<Scalars['Boolean']>;
  login?: Maybe<AuthType>;
  orderLessons?: Maybe<Scalars['Boolean']>;
  orderMenuItems?: Maybe<Scalars['Boolean']>;
  orderTopics?: Maybe<Scalars['Boolean']>;
  removeArticle?: Maybe<Scalars['Boolean']>;
  removeCourse?: Maybe<Scalars['Boolean']>;
  removeLesson?: Maybe<Scalars['Boolean']>;
  removeMenuItem?: Maybe<Scalars['Boolean']>;
  removeTopic?: Maybe<Scalars['Boolean']>;
  sendNotificationToMyself?: Maybe<Scalars['Boolean']>;
  testDriveSignUp?: Maybe<Scalars['Boolean']>;
  updateArticle?: Maybe<Scalars['Boolean']>;
  updateByVideoUploading?: Maybe<Scalars['Boolean']>;
  updateContact?: Maybe<Scalars['Boolean']>;
  updateCourse?: Maybe<Scalars['Boolean']>;
  updateLesson?: Maybe<Scalars['Boolean']>;
  updateMedia?: Maybe<Scalars['Boolean']>;
  updateMenuItem?: Maybe<Scalars['Boolean']>;
  updateTopic?: Maybe<Scalars['Boolean']>;
  updateVideoStatus?: Maybe<Scalars['Boolean']>;
  updateVirtualApp?: Maybe<Scalars['Boolean']>;
  uploadFileToFirestore?: Maybe<FileType>;
  uploadImageFileToFirestore?: Maybe<FileType>;
};


export type MutationCheckPhoneArgs = {
  phone: Scalars['String'];
};


export type MutationCompleteTestDriveSignUpArgs = {
  newPassword: Scalars['String'];
  vApp: CreateVirtualAppInput;
};


export type MutationCreateArticleArgs = {
  data: CreateArticleInput;
};


export type MutationCreateContactArgs = {
  contact: CreateContactInput;
  virtualAppId: Scalars['String'];
};


export type MutationCreateCourseArgs = {
  data: CreateCourseInput;
};


export type MutationCreateLessonArgs = {
  courseId: Scalars['String'];
  data: CreateLessonInput;
  topicId: Scalars['String'];
};


export type MutationCreateLessonByVideoUploadingArgs = {
  courseId: Scalars['String'];
  data: CreateLessonInput;
  topicId: Scalars['String'];
};


export type MutationCreateMediaArgs = {
  actived: Scalars['Boolean'];
  extension: Scalars['String'];
  fileId: Scalars['String'];
  filePath: Scalars['String'];
  fileUrl: Scalars['String'];
  name: Scalars['String'];
  thumbVideoUrl?: Maybe<Scalars['String']>;
  type: MediaManagerTypeEnum;
  virtualAppId: Scalars['String'];
};


export type MutationCreateMenuItemsArgs = {
  datas: Array<CreateMenuItem>;
  path: Scalars['String'];
};


export type MutationCreateTopicArgs = {
  courseId: Scalars['String'];
  data: CreateTopicInput;
};


export type MutationDeleteContactArgs = {
  contactId: Scalars['String'];
  virtualAppId: Scalars['String'];
};


export type MutationDeleteMultipleContactsArgs = {
  contactIds: Array<Scalars['String']>;
  virtualAppId: Scalars['String'];
};


export type MutationInitEncodeVideoArgs = {
  courseId: Scalars['String'];
  createdAt: Scalars['String'];
  fileDuration: Scalars['Float'];
  fileId: Scalars['String'];
  fileName: Scalars['String'];
  filePath: Scalars['String'];
  fileSize: Scalars['Float'];
  lessonId: Scalars['String'];
  status: Scalars['String'];
  topicId: Scalars['String'];
  virtualAppId: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationOrderLessonsArgs = {
  courseId: Scalars['String'];
  lessonsIds: Array<Scalars['String']>;
  topicId: Scalars['String'];
};


export type MutationOrderMenuItemsArgs = {
  menuItemsIds: Array<Scalars['String']>;
  path: Scalars['String'];
};


export type MutationOrderTopicsArgs = {
  courseId: Scalars['String'];
  topicsIds: Array<Scalars['String']>;
};


export type MutationRemoveArticleArgs = {
  articleId: Scalars['String'];
};


export type MutationRemoveCourseArgs = {
  courseId: Scalars['String'];
};


export type MutationRemoveLessonArgs = {
  courseId: Scalars['String'];
  lessonId: Scalars['String'];
  topicId: Scalars['String'];
};


export type MutationRemoveMenuItemArgs = {
  path: Scalars['String'];
};


export type MutationRemoveTopicArgs = {
  courseId: Scalars['String'];
  topicId: Scalars['String'];
};


export type MutationSendNotificationToMyselfArgs = {
  description: Scalars['String'];
  lessonId: Scalars['String'];
  title: Scalars['String'];
  virtualAppId: Scalars['String'];
};


export type MutationTestDriveSignUpArgs = {
  countryCode: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationUpdateArticleArgs = {
  data: UpdateArticleInput;
};


export type MutationUpdateByVideoUploadingArgs = {
  courseId: Scalars['String'];
  data: UpdateLessonInput;
  lessonId: Scalars['String'];
  topicId: Scalars['String'];
};


export type MutationUpdateContactArgs = {
  contactId: Scalars['String'];
  updateFields: CreateContactInput;
  virtualAppId: Scalars['String'];
};


export type MutationUpdateCourseArgs = {
  data: UpdateCourseInput;
};


export type MutationUpdateLessonArgs = {
  courseId: Scalars['String'];
  data: UpdateLessonInput;
  lessonId: Scalars['String'];
  topicId: Scalars['String'];
};


export type MutationUpdateMediaArgs = {
  actived?: Maybe<Scalars['Boolean']>;
  fileId: Scalars['String'];
  filePath?: Maybe<Scalars['String']>;
  fileUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  thumbVideoUrl?: Maybe<Scalars['String']>;
  virtualAppId: Scalars['String'];
};


export type MutationUpdateMenuItemArgs = {
  data: UpdateMenuItem;
  path: Scalars['String'];
};


export type MutationUpdateTopicArgs = {
  courseId: Scalars['String'];
  data: UpdateTopicInput;
  topicId: Scalars['String'];
};


export type MutationUpdateVideoStatusArgs = {
  fileId: Scalars['String'];
  status: Scalars['String'];
};


export type MutationUpdateVirtualAppArgs = {
  data: UpdateVirtualAppInput;
  virtualAppId: Scalars['String'];
};


export type MutationUploadFileToFirestoreArgs = {
  file: Scalars['Upload'];
  folder: Scalars['String'];
  folderId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationUploadImageFileToFirestoreArgs = {
  file: Scalars['Upload'];
  folder: Scalars['String'];
  folderId: Scalars['String'];
  imageType: ImageFileType;
  userId: Scalars['String'];
};

export type PlacesType = {
  __typename?: 'PlacesType';
  userAddress: Scalars['String'];
  userCity: Scalars['String'];
  userCountry: Scalars['String'];
  userState: Scalars['String'];
  userZipCode: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getArticle?: Maybe<ArticleType>;
  getArticlesByUserUid?: Maybe<Array<Maybe<ArticleType>>>;
  getArticlesByVirtualAppId?: Maybe<Array<Maybe<ArticleType>>>;
  getContactById?: Maybe<ContactType>;
  getCourse?: Maybe<CourseType>;
  getCoursesByUserUid?: Maybe<Array<Maybe<CourseType>>>;
  getCoursesByVirtualAppId?: Maybe<Array<Maybe<CourseType>>>;
  getLessonsByTopicId?: Maybe<Array<Maybe<LessonType>>>;
  getMenuItemsByPath?: Maybe<Array<Maybe<MenuItemType>>>;
  getMenuPageByPath?: Maybe<MenuType>;
  getPlaceDetails?: Maybe<PlacesType>;
  getPlacesAutocompleteOptions?: Maybe<Array<Maybe<AutocompleteOption>>>;
  getTopicsByCourseId?: Maybe<Array<Maybe<TopicType>>>;
  getUser?: Maybe<UserType>;
  getVideosLessonByVirtualAppId?: Maybe<Array<Maybe<VideoLessonType>>>;
  getVirtualApp?: Maybe<VirtualAppType>;
};


export type QueryGetArticleArgs = {
  articleId: Scalars['String'];
};


export type QueryGetArticlesByVirtualAppIdArgs = {
  virtualAppId: Scalars['String'];
};


export type QueryGetContactByIdArgs = {
  contactId: Scalars['String'];
  virtualAppId: Scalars['String'];
};


export type QueryGetCourseArgs = {
  courseId: Scalars['String'];
};


export type QueryGetCoursesByVirtualAppIdArgs = {
  virtualAppId: Scalars['String'];
};


export type QueryGetLessonsByTopicIdArgs = {
  courseId: Scalars['String'];
  topicId: Scalars['String'];
};


export type QueryGetMenuItemsByPathArgs = {
  path: Scalars['String'];
};


export type QueryGetMenuPageByPathArgs = {
  path: Scalars['String'];
};


export type QueryGetPlaceDetailsArgs = {
  place_id: Scalars['String'];
};


export type QueryGetPlacesAutocompleteOptionsArgs = {
  input: Scalars['String'];
};


export type QueryGetTopicsByCourseIdArgs = {
  courseId: Scalars['String'];
};


export type QueryGetVideosLessonByVirtualAppIdArgs = {
  vAppId: Scalars['String'];
};


export type QueryGetVirtualAppArgs = {
  virtualAppId: Scalars['String'];
};

export type TopicType = {
  __typename?: 'TopicType';
  active: Scalars['Boolean'];
  courseId: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['String'];
  lessonCount?: Maybe<Scalars['Int']>;
  lessons?: Maybe<Array<LessonType>>;
  order: Scalars['Int'];
  thumbnail: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateArticleInput = {
  article: CreateArticleInput;
  articleId: Scalars['String'];
};

export type UpdateCourseInput = {
  course: CreateCourseInput;
  courseId: Scalars['String'];
};

export type UpdateLessonInput = {
  active?: Maybe<Scalars['Boolean']>;
  contenttype?: Maybe<Scalars['String']>;
  currentChunkProcess?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  encodeFileId?: Maybe<Scalars['String']>;
  fileMediaId?: Maybe<Scalars['String']>;
  lessonMinutes?: Maybe<Scalars['Float']>;
  maxChunkProcess?: Maybe<Scalars['String']>;
  mediaUrl?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  thumbnail?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateMenuItem = {
  active?: Maybe<Scalars['Boolean']>;
  background?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  protected?: Maybe<Scalars['Boolean']>;
  thumbnail?: Maybe<Scalars['String']>;
};

export type UpdateTopicInput = {
  active?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  lessonCount?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['Int']>;
  thumbnail?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateVirtualAppInput = {
  activationLink?: Maybe<Scalars['String']>;
  activationStatus?: Maybe<Scalars['Boolean']>;
  active?: Maybe<Scalars['Boolean']>;
  appKey?: Maybe<Scalars['String']>;
  appOwnerName?: Maybe<Scalars['String']>;
  appStatus?: Maybe<Scalars['Int']>;
  appTimeZone?: Maybe<Scalars['String']>;
  articlesCount?: Maybe<Scalars['Int']>;
  automaticTimezone?: Maybe<Scalars['Boolean']>;
  backgroundColor?: Maybe<Scalars['String']>;
  bottomBarPref?: Maybe<BottomBarTypeEnum>;
  bottombarHidden?: Maybe<Scalars['Boolean']>;
  companyAddress?: Maybe<Scalars['String']>;
  companyCity?: Maybe<Scalars['String']>;
  companyCountry?: Maybe<Scalars['String']>;
  companyCountryCode?: Maybe<Scalars['String']>;
  companyHelpCenter?: Maybe<Scalars['String']>;
  companyHelpEmail?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  companyNiche?: Maybe<Scalars['String']>;
  companyPhoneNumber?: Maybe<Scalars['Float']>;
  companyState?: Maybe<Scalars['String']>;
  companyZipCode?: Maybe<Scalars['String']>;
  courseVideosCount?: Maybe<Scalars['Int']>;
  ctaColor?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  editProfileDeeplink?: Maybe<Scalars['String']>;
  highlightColor?: Maybe<Scalars['String']>;
  inviteUserLink?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  notificationIntervalHour?: Maybe<Scalars['Int']>;
  titleBarColor?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type UserType = {
  __typename?: 'UserType';
  email: Scalars['String'];
  id: Scalars['String'];
  isFirstLogin?: Maybe<Scalars['Boolean']>;
  phone: Scalars['String'];
  type: UserTypeEnum;
  userName: Scalars['String'];
  virtualApps?: Maybe<Array<Maybe<VirtualAppType>>>;
};

export enum UserTypeEnum {
  Admin = 'ADMIN',
  Contact = 'CONTACT',
  Owner = 'OWNER',
  SuperAdmin = 'SUPER_ADMIN'
}

export type VideoLessonType = {
  __typename?: 'VideoLessonType';
  courseId: Scalars['String'];
  courseName: Scalars['String'];
  createdAt: Scalars['String'];
  fileDuration: Scalars['Float'];
  fileName: Scalars['String'];
  filePath: Scalars['String'];
  fileSize: Scalars['Float'];
  id: Scalars['String'];
  lessonId: Scalars['String'];
  lessonName: Scalars['String'];
  status: Scalars['String'];
  topicId: Scalars['String'];
  virtualAppId: Scalars['String'];
};

export type VirtualAppType = {
  __typename?: 'VirtualAppType';
  activationLink?: Maybe<Scalars['String']>;
  activationStatus?: Maybe<Scalars['Boolean']>;
  active?: Maybe<Scalars['Boolean']>;
  appKey?: Maybe<Scalars['String']>;
  appOwnerName?: Maybe<Scalars['String']>;
  appStatus?: Maybe<Scalars['Int']>;
  appTimeZone?: Maybe<Scalars['String']>;
  articlesCount?: Maybe<Scalars['Int']>;
  automaticTimezone?: Maybe<Scalars['Boolean']>;
  backgroundColor?: Maybe<Scalars['String']>;
  bottomBarPref: BottomBarTypeEnum;
  bottombarHidden?: Maybe<Scalars['Boolean']>;
  companyAddress?: Maybe<Scalars['String']>;
  companyCity?: Maybe<Scalars['String']>;
  companyCountry?: Maybe<Scalars['String']>;
  companyCountryCode?: Maybe<Scalars['String']>;
  companyHelpCenter?: Maybe<Scalars['String']>;
  companyHelpEmail?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  companyNiche?: Maybe<Scalars['String']>;
  companyPhoneNumber?: Maybe<Scalars['Float']>;
  companyState?: Maybe<Scalars['String']>;
  companyZipCode?: Maybe<Scalars['String']>;
  contacts?: Maybe<Array<Maybe<ContactType>>>;
  courseVideosCount?: Maybe<Scalars['Int']>;
  courses?: Maybe<Array<Maybe<CourseType>>>;
  ctaColor?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  editProfileDeeplink?: Maybe<Scalars['String']>;
  highlightColor?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  inviteUserLink?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  mediaHost?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  notificationIntervalHour?: Maybe<Scalars['Int']>;
  titleBarColor?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};


export type VirtualAppTypeContactsArgs = {
  contactId?: Maybe<Scalars['String']>;
};

export type UpdateMenuItemMutationVariables = Exact<{
  path: Scalars['String'];
  data: UpdateMenuItem;
}>;


export type UpdateMenuItemMutation = { __typename?: 'Mutation', updateMenuItem?: boolean | null | undefined };

export type CreateContactMutationVariables = Exact<{
  contact: CreateContactInput;
  virtualAppId: Scalars['String'];
}>;


export type CreateContactMutation = { __typename?: 'Mutation', createContact?: boolean | null | undefined };

export type GetPlacesAutocompleteOptionsQueryVariables = Exact<{
  input: Scalars['String'];
}>;


export type GetPlacesAutocompleteOptionsQuery = { __typename?: 'Query', getPlacesAutocompleteOptions?: Array<{ __typename?: 'AutocompleteOption', label?: string | null | undefined, value?: string | null | undefined } | null | undefined> | null | undefined };

export type GetPlaceDetailsQueryVariables = Exact<{
  placeId: Scalars['String'];
}>;


export type GetPlaceDetailsQuery = { __typename?: 'Query', getPlaceDetails?: { __typename?: 'PlacesType', userAddress: string, userCity: string, userCountry: string, userZipCode: string, userState: string } | null | undefined };

export type GetCoursesMenuManagerQueryVariables = Exact<{
  virtualAppId: Scalars['String'];
}>;


export type GetCoursesMenuManagerQuery = { __typename?: 'Query', getCoursesByVirtualAppId?: Array<{ __typename?: 'CourseType', id: string, name: string, description: string, active: boolean, thumbnail?: string | null | undefined, protected: boolean, tagId: string } | null | undefined> | null | undefined };

export type GetArticlesMenuManagerQueryVariables = Exact<{
  virtualAppId: Scalars['String'];
}>;


export type GetArticlesMenuManagerQuery = { __typename?: 'Query', getArticlesByVirtualAppId?: Array<{ __typename?: 'ArticleType', id: string, name: string, thumbnail: string, description: string, active: boolean, protected: boolean, tagIDs: Array<number | null | undefined> } | null | undefined> | null | undefined };

export type CreateMenuItemsMutationVariables = Exact<{
  path: Scalars['String'];
  datas: Array<CreateMenuItem> | CreateMenuItem;
}>;


export type CreateMenuItemsMutation = { __typename?: 'Mutation', createMenuItems?: boolean | null | undefined };

export type GetVirtualAppQueryVariables = Exact<{
  virtualAppId: Scalars['String'];
}>;


export type GetVirtualAppQuery = { __typename?: 'Query', getVirtualApp?: { __typename?: 'VirtualAppType', description: string, id: string, userId: string, name: string, activationLink?: string | null | undefined, activationStatus?: boolean | null | undefined, appStatus?: number | null | undefined, logo?: string | null | undefined, backgroundColor?: string | null | undefined, ctaColor?: string | null | undefined, highlightColor?: string | null | undefined, titleBarColor?: string | null | undefined, bottomBarPref: BottomBarTypeEnum, bottombarHidden?: boolean | null | undefined, notificationIntervalHour?: number | null | undefined, mediaHost?: number | null | undefined } | null | undefined };

export type GetContactByIdQueryVariables = Exact<{
  contactId: Scalars['String'];
  virtualAppId: Scalars['String'];
}>;


export type GetContactByIdQuery = { __typename?: 'Query', getContactById?: { __typename?: 'ContactType', id?: string | null | undefined, createdAt?: string | null | undefined, active?: boolean | null | undefined, countryCode?: string | null | undefined, userFirstName?: string | null | undefined, userLastName?: string | null | undefined, userImage?: string | null | undefined, userEmail?: string | null | undefined, userMobile?: string | null | undefined, userName?: string | null | undefined, billingAddress: { __typename?: 'AddressType', userAddress?: string | null | undefined, userCity?: string | null | undefined, userCountry?: string | null | undefined, userState?: string | null | undefined, userZipCode?: string | null | undefined }, shippingAddress: { __typename?: 'AddressType', userAddress?: string | null | undefined, userCity?: string | null | undefined, userCountry?: string | null | undefined, userState?: string | null | undefined, userZipCode?: string | null | undefined } } | null | undefined };

export type UpdateContactMutationVariables = Exact<{
  contactId: Scalars['String'];
  virtualAppId: Scalars['String'];
  updateFields: CreateContactInput;
}>;


export type UpdateContactMutation = { __typename?: 'Mutation', updateContact?: boolean | null | undefined };

export type DeleteMultipleContactsMutationVariables = Exact<{
  contactIds: Array<Scalars['String']> | Scalars['String'];
  virtualAppId: Scalars['String'];
}>;


export type DeleteMultipleContactsMutation = { __typename?: 'Mutation', deleteMultipleContacts?: boolean | null | undefined };

export type DeleteContactMutationVariables = Exact<{
  contactId: Scalars['String'];
  virtualAppId: Scalars['String'];
}>;


export type DeleteContactMutation = { __typename?: 'Mutation', deleteContact?: boolean | null | undefined };

export type GetArticlesByVirtualAppIdQueryVariables = Exact<{
  virtualAppId: Scalars['String'];
}>;


export type GetArticlesByVirtualAppIdQuery = { __typename?: 'Query', getArticlesByVirtualAppId?: Array<{ __typename?: 'ArticleType', id: string, name: string, description: string, thumbnail: string, active: boolean } | null | undefined> | null | undefined };

export type GetCoursesByVirtualAppIdQueryVariables = Exact<{
  virtualAppId: Scalars['String'];
}>;


export type GetCoursesByVirtualAppIdQuery = { __typename?: 'Query', getCoursesByVirtualAppId?: Array<{ __typename?: 'CourseType', id: string, userId: string, tagId: string, virtualAppId: string, name: string, description: string, active: boolean, commentType: number, createdAt?: string | null | undefined, defaultImage?: string | null | undefined, courseImage?: string | null | undefined, thumbnail?: string | null | undefined, lessonCount?: string | null | undefined, courseVideosCount?: string | null | undefined } | null | undefined> | null | undefined };

export type CheckPhoneMutationVariables = Exact<{
  phone: Scalars['String'];
}>;


export type CheckPhoneMutation = { __typename?: 'Mutation', checkPhone?: boolean | null | undefined };

export type LoginMutationVariables = Exact<{
  phone: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthType', userIdToken: string } | null | undefined };

export type GetUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserInfoQuery = { __typename?: 'Query', getUser?: { __typename?: 'UserType', id: string, userName: string, email: string, phone: string, type: UserTypeEnum, isFirstLogin?: boolean | null | undefined, virtualApps?: Array<{ __typename?: 'VirtualAppType', id: string, name: string, highlightColor?: string | null | undefined, logo?: string | null | undefined, backgroundColor?: string | null | undefined, mediaHost?: number | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type UploadImageFileToFirestoreMutationVariables = Exact<{
  userId: Scalars['String'];
  folderId: Scalars['String'];
  folder: Scalars['String'];
  file: Scalars['Upload'];
  imageType: ImageFileType;
}>;


export type UploadImageFileToFirestoreMutation = { __typename?: 'Mutation', uploadImageFileToFirestore?: { __typename?: 'FileType', filename: string, mimetype: string, encoding: string, downloadLink?: string | null | undefined } | null | undefined };

export type UploadFileToFirestoreMutationVariables = Exact<{
  userId: Scalars['String'];
  folderId: Scalars['String'];
  folder: Scalars['String'];
  file: Scalars['Upload'];
}>;


export type UploadFileToFirestoreMutation = { __typename?: 'Mutation', uploadFileToFirestore?: { __typename?: 'FileType', filename: string, mimetype: string, encoding: string, downloadLink?: string | null | undefined } | null | undefined };

export type RemoveMenuItemMutationVariables = Exact<{
  path: Scalars['String'];
}>;


export type RemoveMenuItemMutation = { __typename?: 'Mutation', removeMenuItem?: boolean | null | undefined };

export type OrderMenuItemsMutationVariables = Exact<{
  path: Scalars['String'];
  menuItemsIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type OrderMenuItemsMutation = { __typename?: 'Mutation', orderMenuItems?: boolean | null | undefined };

export type GetMenuPageByPathQueryVariables = Exact<{
  path: Scalars['String'];
}>;


export type GetMenuPageByPathQuery = { __typename?: 'Query', getMenuPageByPath?: { __typename?: 'MenuType', image?: string | null | undefined, imageTitle?: string | null | undefined, active?: boolean | null | undefined, link?: string | null | undefined } | null | undefined };

export type GetMenuItemsByPathQueryVariables = Exact<{
  path: Scalars['String'];
}>;


export type GetMenuItemsByPathQuery = { __typename?: 'Query', getMenuItemsByPath?: Array<{ __typename?: 'MenuItemType', id: string, menuId: string, name: string, description: string, order: number, path: string, type: MenuItemTypeEnum, thumbnail: string, active?: boolean | null | undefined, background?: boolean | null | undefined } | null | undefined> | null | undefined };

export type GetAppSettingsQueryVariables = Exact<{
  virtualAppId: Scalars['String'];
}>;


export type GetAppSettingsQuery = { __typename?: 'Query', getVirtualApp?: { __typename?: 'VirtualAppType', titleBarColor?: string | null | undefined, logo?: string | null | undefined, highlightColor?: string | null | undefined, ctaColor?: string | null | undefined, backgroundColor?: string | null | undefined, name: string, bottomBarPref: BottomBarTypeEnum, bottombarHidden?: boolean | null | undefined, appKey?: string | null | undefined, notificationIntervalHour?: number | null | undefined, inviteUserLink?: string | null | undefined } | null | undefined };

export type GetProfileQueryVariables = Exact<{
  virtualAppId: Scalars['String'];
}>;


export type GetProfileQuery = { __typename?: 'Query', getVirtualApp?: { __typename?: 'VirtualAppType', companyName?: string | null | undefined, companyNiche?: string | null | undefined, companyHelpEmail?: string | null | undefined, companyHelpCenter?: string | null | undefined, companyCountryCode?: string | null | undefined, companyPhoneNumber?: number | null | undefined, companyZipCode?: string | null | undefined, companyCity?: string | null | undefined, companyAddress?: string | null | undefined, companyCountry?: string | null | undefined, companyState?: string | null | undefined, appOwnerName?: string | null | undefined } | null | undefined };

export type UpdateVirtualAppMutationVariables = Exact<{
  virtualAppId: Scalars['String'];
  data: UpdateVirtualAppInput;
}>;


export type UpdateVirtualAppMutation = { __typename?: 'Mutation', updateVirtualApp?: boolean | null | undefined };

export type CompleteTestDriveSignUpMutationVariables = Exact<{
  vApp: CreateVirtualAppInput;
  newPassword: Scalars['String'];
}>;


export type CompleteTestDriveSignUpMutation = { __typename?: 'Mutation', completeTestDriveSignUp?: boolean | null | undefined };

export type GetCoursesByVirtualAppIdFormUploaderQueryVariables = Exact<{
  virtualAppId: Scalars['String'];
}>;


export type GetCoursesByVirtualAppIdFormUploaderQuery = { __typename?: 'Query', getCoursesByVirtualAppId?: Array<{ __typename?: 'CourseType', name: string, id: string } | null | undefined> | null | undefined };

export type GetTopicsByCourseIdFormUploaderQueryVariables = Exact<{
  courseId: Scalars['String'];
}>;


export type GetTopicsByCourseIdFormUploaderQuery = { __typename?: 'Query', getTopicsByCourseId?: Array<{ __typename?: 'TopicType', id: string, title: string } | null | undefined> | null | undefined };

export type SendNotificationToMyselfMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  virtualAppId: Scalars['String'];
  lessonId: Scalars['String'];
}>;


export type SendNotificationToMyselfMutation = { __typename?: 'Mutation', sendNotificationToMyself?: boolean | null | undefined };

export type CreateLessonByVideoUploadingMutationVariables = Exact<{
  courseId: Scalars['String'];
  topicId: Scalars['String'];
  data: CreateLessonInput;
}>;


export type CreateLessonByVideoUploadingMutation = { __typename?: 'Mutation', createLessonByVideoUploading?: { __typename?: 'LessonType', id: string, topicId: string, title: string, description: string, active: boolean, order: number } | null | undefined };

export type GetCoursesByVirtualAppIdFormUploaderOldQueryVariables = Exact<{
  virtualAppId: Scalars['String'];
}>;


export type GetCoursesByVirtualAppIdFormUploaderOldQuery = { __typename?: 'Query', getCoursesByVirtualAppId?: Array<{ __typename?: 'CourseType', name: string, id: string } | null | undefined> | null | undefined };

export type InitEncodeVideoMutationVariables = Exact<{
  courseId: Scalars['String'];
  topicId: Scalars['String'];
  lessonId: Scalars['String'];
  fileId: Scalars['String'];
  virtualAppId: Scalars['String'];
  filePath: Scalars['String'];
  fileName: Scalars['String'];
  fileSize: Scalars['Float'];
  createdAt: Scalars['String'];
  fileDuration: Scalars['Float'];
  status: Scalars['String'];
}>;


export type InitEncodeVideoMutation = { __typename?: 'Mutation', initEncodeVideo?: boolean | null | undefined };

export type CreateMediaMutationVariables = Exact<{
  fileId: Scalars['String'];
  virtualAppId: Scalars['String'];
  filePath: Scalars['String'];
  fileUrl: Scalars['String'];
  type: MediaManagerTypeEnum;
  actived: Scalars['Boolean'];
  name: Scalars['String'];
  extension: Scalars['String'];
  thumbVideoUrl?: Maybe<Scalars['String']>;
}>;


export type CreateMediaMutation = { __typename?: 'Mutation', createMedia?: boolean | null | undefined };

export type UpdateByVideoUploadingMutationVariables = Exact<{
  courseId: Scalars['String'];
  topicId: Scalars['String'];
  lessonId: Scalars['String'];
  data: UpdateLessonInput;
}>;


export type UpdateByVideoUploadingMutation = { __typename?: 'Mutation', updateByVideoUploading?: boolean | null | undefined };

export type GetContactsFromVirtualAppQueryVariables = Exact<{
  virtualAppId: Scalars['String'];
}>;


export type GetContactsFromVirtualAppQuery = { __typename?: 'Query', getVirtualApp?: { __typename?: 'VirtualAppType', contacts?: Array<{ __typename?: 'ContactType', id?: string | null | undefined, userFirstName?: string | null | undefined, userLastName?: string | null | undefined, createdAt?: string | null | undefined, countryCode?: string | null | undefined, userMobile?: string | null | undefined, active?: boolean | null | undefined, userEmail?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type CreateArticleMutationVariables = Exact<{
  data: CreateArticleInput;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle?: { __typename?: 'ArticleType', id: string, userId: string, virtualAppId: string, name: string, author: string, text: string, description: string, publishDate: any, tagIDs: Array<number | null | undefined>, image: string, mediaUrl: string, active: boolean, thumbnail: string } | null | undefined };

export type UpdateArticleMutationVariables = Exact<{
  data: UpdateArticleInput;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle?: boolean | null | undefined };

export type GetArticleQueryVariables = Exact<{
  articleId: Scalars['String'];
}>;


export type GetArticleQuery = { __typename?: 'Query', getArticle?: { __typename?: 'ArticleType', restrictionType: number, protected: boolean, userId: string, articleMinutes: number, isHtml?: boolean | null | undefined, id: string, virtualAppId: string, name: string, author: string, text: string, description: string, active: boolean, articleType: ArticleTypeEnum, tagIDs: Array<number | null | undefined>, publishDate: any, createdAt?: number | null | undefined, image: string, mediaUrl: string, thumbnail: string, videoThumbnail: string } | null | undefined };

export type RemoveArticleMutationVariables = Exact<{
  articleId: Scalars['String'];
}>;


export type RemoveArticleMutation = { __typename?: 'Mutation', removeArticle?: boolean | null | undefined };

export type RemoveCourseMutationVariables = Exact<{
  courseId: Scalars['String'];
}>;


export type RemoveCourseMutation = { __typename?: 'Mutation', removeCourse?: boolean | null | undefined };

export type CreateCourseMutationVariables = Exact<{
  data: CreateCourseInput;
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse?: { __typename?: 'CourseType', id: string, userId: string, tagId: string, virtualAppId: string, name: string } | null | undefined };

export type UpdateCourseMutationVariables = Exact<{
  data: UpdateCourseInput;
}>;


export type UpdateCourseMutation = { __typename?: 'Mutation', updateCourse?: boolean | null | undefined };

export type GetCourseQueryVariables = Exact<{
  courseId: Scalars['String'];
}>;


export type GetCourseQuery = { __typename?: 'Query', getCourse?: { __typename?: 'CourseType', name: string, description: string, commentType: number, courseAlerts: number, restrictionType: number, protected: boolean, active: boolean, defaultImage?: string | null | undefined, courseImage?: string | null | undefined, thumbnail?: string | null | undefined, showOrderNumber: boolean } | null | undefined };

export type GetTopicsByCourseIdQueryVariables = Exact<{
  courseId: Scalars['String'];
}>;


export type GetTopicsByCourseIdQuery = { __typename?: 'Query', getTopicsByCourseId?: Array<{ __typename?: 'TopicType', id: string, title: string, description: string, order: number, lessons?: Array<{ __typename?: 'LessonType', id: string, topicId: string, title: string, description: string, active: boolean, order: number, mediaUrl: string, thumbnail: string, contenttype: string }> | null | undefined } | null | undefined> | null | undefined };

export type TestDriveSignUpMutationVariables = Exact<{
  countryCode: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type TestDriveSignUpMutation = { __typename?: 'Mutation', testDriveSignUp?: boolean | null | undefined };

export type GetVideosLessonByVirtualAppIdQueryVariables = Exact<{
  vAppId: Scalars['String'];
}>;


export type GetVideosLessonByVirtualAppIdQuery = { __typename?: 'Query', getVideosLessonByVirtualAppId?: Array<{ __typename?: 'VideoLessonType', id: string, fileName: string, createdAt: string, status: string, courseName: string, lessonName: string, lessonId: string, topicId: string, courseId: string } | null | undefined> | null | undefined };


export const UpdateMenuItemDocument = gql`
    mutation UpdateMenuItem($path: String!, $data: UpdateMenuItem!) {
  updateMenuItem(path: $path, data: $data)
}
    `;
export type UpdateMenuItemMutationFn = Apollo.MutationFunction<UpdateMenuItemMutation, UpdateMenuItemMutationVariables>;

/**
 * __useUpdateMenuItemMutation__
 *
 * To run a mutation, you first call `useUpdateMenuItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMenuItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMenuItemMutation, { data, loading, error }] = useUpdateMenuItemMutation({
 *   variables: {
 *      path: // value for 'path'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateMenuItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMenuItemMutation, UpdateMenuItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMenuItemMutation, UpdateMenuItemMutationVariables>(UpdateMenuItemDocument, options);
      }
export type UpdateMenuItemMutationHookResult = ReturnType<typeof useUpdateMenuItemMutation>;
export type UpdateMenuItemMutationResult = Apollo.MutationResult<UpdateMenuItemMutation>;
export type UpdateMenuItemMutationOptions = Apollo.BaseMutationOptions<UpdateMenuItemMutation, UpdateMenuItemMutationVariables>;
export const CreateContactDocument = gql`
    mutation CreateContact($contact: CreateContactInput!, $virtualAppId: String!) {
  createContact(contact: $contact, virtualAppId: $virtualAppId)
}
    `;
export type CreateContactMutationFn = Apollo.MutationFunction<CreateContactMutation, CreateContactMutationVariables>;

/**
 * __useCreateContactMutation__
 *
 * To run a mutation, you first call `useCreateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContactMutation, { data, loading, error }] = useCreateContactMutation({
 *   variables: {
 *      contact: // value for 'contact'
 *      virtualAppId: // value for 'virtualAppId'
 *   },
 * });
 */
export function useCreateContactMutation(baseOptions?: Apollo.MutationHookOptions<CreateContactMutation, CreateContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContactMutation, CreateContactMutationVariables>(CreateContactDocument, options);
      }
export type CreateContactMutationHookResult = ReturnType<typeof useCreateContactMutation>;
export type CreateContactMutationResult = Apollo.MutationResult<CreateContactMutation>;
export type CreateContactMutationOptions = Apollo.BaseMutationOptions<CreateContactMutation, CreateContactMutationVariables>;
export const GetPlacesAutocompleteOptionsDocument = gql`
    query GetPlacesAutocompleteOptions($input: String!) {
  getPlacesAutocompleteOptions(input: $input) {
    label
    value
  }
}
    `;

/**
 * __useGetPlacesAutocompleteOptionsQuery__
 *
 * To run a query within a React component, call `useGetPlacesAutocompleteOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlacesAutocompleteOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlacesAutocompleteOptionsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPlacesAutocompleteOptionsQuery(baseOptions: Apollo.QueryHookOptions<GetPlacesAutocompleteOptionsQuery, GetPlacesAutocompleteOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlacesAutocompleteOptionsQuery, GetPlacesAutocompleteOptionsQueryVariables>(GetPlacesAutocompleteOptionsDocument, options);
      }
export function useGetPlacesAutocompleteOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlacesAutocompleteOptionsQuery, GetPlacesAutocompleteOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlacesAutocompleteOptionsQuery, GetPlacesAutocompleteOptionsQueryVariables>(GetPlacesAutocompleteOptionsDocument, options);
        }
export type GetPlacesAutocompleteOptionsQueryHookResult = ReturnType<typeof useGetPlacesAutocompleteOptionsQuery>;
export type GetPlacesAutocompleteOptionsLazyQueryHookResult = ReturnType<typeof useGetPlacesAutocompleteOptionsLazyQuery>;
export type GetPlacesAutocompleteOptionsQueryResult = Apollo.QueryResult<GetPlacesAutocompleteOptionsQuery, GetPlacesAutocompleteOptionsQueryVariables>;
export const GetPlaceDetailsDocument = gql`
    query GetPlaceDetails($placeId: String!) {
  getPlaceDetails(place_id: $placeId) {
    userAddress
    userCity
    userCountry
    userZipCode
    userState
  }
}
    `;

/**
 * __useGetPlaceDetailsQuery__
 *
 * To run a query within a React component, call `useGetPlaceDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaceDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaceDetailsQuery({
 *   variables: {
 *      placeId: // value for 'placeId'
 *   },
 * });
 */
export function useGetPlaceDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetPlaceDetailsQuery, GetPlaceDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlaceDetailsQuery, GetPlaceDetailsQueryVariables>(GetPlaceDetailsDocument, options);
      }
export function useGetPlaceDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlaceDetailsQuery, GetPlaceDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlaceDetailsQuery, GetPlaceDetailsQueryVariables>(GetPlaceDetailsDocument, options);
        }
export type GetPlaceDetailsQueryHookResult = ReturnType<typeof useGetPlaceDetailsQuery>;
export type GetPlaceDetailsLazyQueryHookResult = ReturnType<typeof useGetPlaceDetailsLazyQuery>;
export type GetPlaceDetailsQueryResult = Apollo.QueryResult<GetPlaceDetailsQuery, GetPlaceDetailsQueryVariables>;
export const GetCoursesMenuManagerDocument = gql`
    query GetCoursesMenuManager($virtualAppId: String!) {
  getCoursesByVirtualAppId(virtualAppId: $virtualAppId) {
    id
    name
    description
    active
    thumbnail
    protected
    tagId
  }
}
    `;

/**
 * __useGetCoursesMenuManagerQuery__
 *
 * To run a query within a React component, call `useGetCoursesMenuManagerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoursesMenuManagerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoursesMenuManagerQuery({
 *   variables: {
 *      virtualAppId: // value for 'virtualAppId'
 *   },
 * });
 */
export function useGetCoursesMenuManagerQuery(baseOptions: Apollo.QueryHookOptions<GetCoursesMenuManagerQuery, GetCoursesMenuManagerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoursesMenuManagerQuery, GetCoursesMenuManagerQueryVariables>(GetCoursesMenuManagerDocument, options);
      }
export function useGetCoursesMenuManagerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoursesMenuManagerQuery, GetCoursesMenuManagerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoursesMenuManagerQuery, GetCoursesMenuManagerQueryVariables>(GetCoursesMenuManagerDocument, options);
        }
export type GetCoursesMenuManagerQueryHookResult = ReturnType<typeof useGetCoursesMenuManagerQuery>;
export type GetCoursesMenuManagerLazyQueryHookResult = ReturnType<typeof useGetCoursesMenuManagerLazyQuery>;
export type GetCoursesMenuManagerQueryResult = Apollo.QueryResult<GetCoursesMenuManagerQuery, GetCoursesMenuManagerQueryVariables>;
export const GetArticlesMenuManagerDocument = gql`
    query GetArticlesMenuManager($virtualAppId: String!) {
  getArticlesByVirtualAppId(virtualAppId: $virtualAppId) {
    id
    name
    thumbnail
    description
    active
    protected
    tagIDs
  }
}
    `;

/**
 * __useGetArticlesMenuManagerQuery__
 *
 * To run a query within a React component, call `useGetArticlesMenuManagerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesMenuManagerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlesMenuManagerQuery({
 *   variables: {
 *      virtualAppId: // value for 'virtualAppId'
 *   },
 * });
 */
export function useGetArticlesMenuManagerQuery(baseOptions: Apollo.QueryHookOptions<GetArticlesMenuManagerQuery, GetArticlesMenuManagerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticlesMenuManagerQuery, GetArticlesMenuManagerQueryVariables>(GetArticlesMenuManagerDocument, options);
      }
export function useGetArticlesMenuManagerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticlesMenuManagerQuery, GetArticlesMenuManagerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticlesMenuManagerQuery, GetArticlesMenuManagerQueryVariables>(GetArticlesMenuManagerDocument, options);
        }
export type GetArticlesMenuManagerQueryHookResult = ReturnType<typeof useGetArticlesMenuManagerQuery>;
export type GetArticlesMenuManagerLazyQueryHookResult = ReturnType<typeof useGetArticlesMenuManagerLazyQuery>;
export type GetArticlesMenuManagerQueryResult = Apollo.QueryResult<GetArticlesMenuManagerQuery, GetArticlesMenuManagerQueryVariables>;
export const CreateMenuItemsDocument = gql`
    mutation CreateMenuItems($path: String!, $datas: [CreateMenuItem!]!) {
  createMenuItems(path: $path, datas: $datas)
}
    `;
export type CreateMenuItemsMutationFn = Apollo.MutationFunction<CreateMenuItemsMutation, CreateMenuItemsMutationVariables>;

/**
 * __useCreateMenuItemsMutation__
 *
 * To run a mutation, you first call `useCreateMenuItemsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMenuItemsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMenuItemsMutation, { data, loading, error }] = useCreateMenuItemsMutation({
 *   variables: {
 *      path: // value for 'path'
 *      datas: // value for 'datas'
 *   },
 * });
 */
export function useCreateMenuItemsMutation(baseOptions?: Apollo.MutationHookOptions<CreateMenuItemsMutation, CreateMenuItemsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMenuItemsMutation, CreateMenuItemsMutationVariables>(CreateMenuItemsDocument, options);
      }
export type CreateMenuItemsMutationHookResult = ReturnType<typeof useCreateMenuItemsMutation>;
export type CreateMenuItemsMutationResult = Apollo.MutationResult<CreateMenuItemsMutation>;
export type CreateMenuItemsMutationOptions = Apollo.BaseMutationOptions<CreateMenuItemsMutation, CreateMenuItemsMutationVariables>;
export const GetVirtualAppDocument = gql`
    query getVirtualApp($virtualAppId: String!) {
  getVirtualApp(virtualAppId: $virtualAppId) {
    description
    id
    userId
    name
    activationLink
    activationStatus
    appStatus
    logo
    backgroundColor
    ctaColor
    highlightColor
    titleBarColor
    bottomBarPref
    bottombarHidden
    notificationIntervalHour
    mediaHost
  }
}
    `;

/**
 * __useGetVirtualAppQuery__
 *
 * To run a query within a React component, call `useGetVirtualAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVirtualAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVirtualAppQuery({
 *   variables: {
 *      virtualAppId: // value for 'virtualAppId'
 *   },
 * });
 */
export function useGetVirtualAppQuery(baseOptions: Apollo.QueryHookOptions<GetVirtualAppQuery, GetVirtualAppQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVirtualAppQuery, GetVirtualAppQueryVariables>(GetVirtualAppDocument, options);
      }
export function useGetVirtualAppLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVirtualAppQuery, GetVirtualAppQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVirtualAppQuery, GetVirtualAppQueryVariables>(GetVirtualAppDocument, options);
        }
export type GetVirtualAppQueryHookResult = ReturnType<typeof useGetVirtualAppQuery>;
export type GetVirtualAppLazyQueryHookResult = ReturnType<typeof useGetVirtualAppLazyQuery>;
export type GetVirtualAppQueryResult = Apollo.QueryResult<GetVirtualAppQuery, GetVirtualAppQueryVariables>;
export const GetContactByIdDocument = gql`
    query GetContactById($contactId: String!, $virtualAppId: String!) {
  getContactById(contactId: $contactId, virtualAppId: $virtualAppId) {
    billingAddress {
      userAddress
      userCity
      userCountry
      userState
      userZipCode
    }
    id
    createdAt
    active
    countryCode
    userFirstName
    userLastName
    userImage
    userEmail
    userMobile
    userName
    shippingAddress {
      userAddress
      userCity
      userCountry
      userState
      userZipCode
    }
  }
}
    `;

/**
 * __useGetContactByIdQuery__
 *
 * To run a query within a React component, call `useGetContactByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContactByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContactByIdQuery({
 *   variables: {
 *      contactId: // value for 'contactId'
 *      virtualAppId: // value for 'virtualAppId'
 *   },
 * });
 */
export function useGetContactByIdQuery(baseOptions: Apollo.QueryHookOptions<GetContactByIdQuery, GetContactByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContactByIdQuery, GetContactByIdQueryVariables>(GetContactByIdDocument, options);
      }
export function useGetContactByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContactByIdQuery, GetContactByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContactByIdQuery, GetContactByIdQueryVariables>(GetContactByIdDocument, options);
        }
export type GetContactByIdQueryHookResult = ReturnType<typeof useGetContactByIdQuery>;
export type GetContactByIdLazyQueryHookResult = ReturnType<typeof useGetContactByIdLazyQuery>;
export type GetContactByIdQueryResult = Apollo.QueryResult<GetContactByIdQuery, GetContactByIdQueryVariables>;
export const UpdateContactDocument = gql`
    mutation UpdateContact($contactId: String!, $virtualAppId: String!, $updateFields: CreateContactInput!) {
  updateContact(
    contactId: $contactId
    virtualAppId: $virtualAppId
    updateFields: $updateFields
  )
}
    `;
export type UpdateContactMutationFn = Apollo.MutationFunction<UpdateContactMutation, UpdateContactMutationVariables>;

/**
 * __useUpdateContactMutation__
 *
 * To run a mutation, you first call `useUpdateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContactMutation, { data, loading, error }] = useUpdateContactMutation({
 *   variables: {
 *      contactId: // value for 'contactId'
 *      virtualAppId: // value for 'virtualAppId'
 *      updateFields: // value for 'updateFields'
 *   },
 * });
 */
export function useUpdateContactMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContactMutation, UpdateContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContactMutation, UpdateContactMutationVariables>(UpdateContactDocument, options);
      }
export type UpdateContactMutationHookResult = ReturnType<typeof useUpdateContactMutation>;
export type UpdateContactMutationResult = Apollo.MutationResult<UpdateContactMutation>;
export type UpdateContactMutationOptions = Apollo.BaseMutationOptions<UpdateContactMutation, UpdateContactMutationVariables>;
export const DeleteMultipleContactsDocument = gql`
    mutation DeleteMultipleContacts($contactIds: [String!]!, $virtualAppId: String!) {
  deleteMultipleContacts(contactIds: $contactIds, virtualAppId: $virtualAppId)
}
    `;
export type DeleteMultipleContactsMutationFn = Apollo.MutationFunction<DeleteMultipleContactsMutation, DeleteMultipleContactsMutationVariables>;

/**
 * __useDeleteMultipleContactsMutation__
 *
 * To run a mutation, you first call `useDeleteMultipleContactsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMultipleContactsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMultipleContactsMutation, { data, loading, error }] = useDeleteMultipleContactsMutation({
 *   variables: {
 *      contactIds: // value for 'contactIds'
 *      virtualAppId: // value for 'virtualAppId'
 *   },
 * });
 */
export function useDeleteMultipleContactsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMultipleContactsMutation, DeleteMultipleContactsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMultipleContactsMutation, DeleteMultipleContactsMutationVariables>(DeleteMultipleContactsDocument, options);
      }
export type DeleteMultipleContactsMutationHookResult = ReturnType<typeof useDeleteMultipleContactsMutation>;
export type DeleteMultipleContactsMutationResult = Apollo.MutationResult<DeleteMultipleContactsMutation>;
export type DeleteMultipleContactsMutationOptions = Apollo.BaseMutationOptions<DeleteMultipleContactsMutation, DeleteMultipleContactsMutationVariables>;
export const DeleteContactDocument = gql`
    mutation DeleteContact($contactId: String!, $virtualAppId: String!) {
  deleteContact(contactId: $contactId, virtualAppId: $virtualAppId)
}
    `;
export type DeleteContactMutationFn = Apollo.MutationFunction<DeleteContactMutation, DeleteContactMutationVariables>;

/**
 * __useDeleteContactMutation__
 *
 * To run a mutation, you first call `useDeleteContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContactMutation, { data, loading, error }] = useDeleteContactMutation({
 *   variables: {
 *      contactId: // value for 'contactId'
 *      virtualAppId: // value for 'virtualAppId'
 *   },
 * });
 */
export function useDeleteContactMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContactMutation, DeleteContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContactMutation, DeleteContactMutationVariables>(DeleteContactDocument, options);
      }
export type DeleteContactMutationHookResult = ReturnType<typeof useDeleteContactMutation>;
export type DeleteContactMutationResult = Apollo.MutationResult<DeleteContactMutation>;
export type DeleteContactMutationOptions = Apollo.BaseMutationOptions<DeleteContactMutation, DeleteContactMutationVariables>;
export const GetArticlesByVirtualAppIdDocument = gql`
    query getArticlesByVirtualAppId($virtualAppId: String!) {
  getArticlesByVirtualAppId(virtualAppId: $virtualAppId) {
    id
    name
    description
    thumbnail
    active
  }
}
    `;

/**
 * __useGetArticlesByVirtualAppIdQuery__
 *
 * To run a query within a React component, call `useGetArticlesByVirtualAppIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesByVirtualAppIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlesByVirtualAppIdQuery({
 *   variables: {
 *      virtualAppId: // value for 'virtualAppId'
 *   },
 * });
 */
export function useGetArticlesByVirtualAppIdQuery(baseOptions: Apollo.QueryHookOptions<GetArticlesByVirtualAppIdQuery, GetArticlesByVirtualAppIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticlesByVirtualAppIdQuery, GetArticlesByVirtualAppIdQueryVariables>(GetArticlesByVirtualAppIdDocument, options);
      }
export function useGetArticlesByVirtualAppIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticlesByVirtualAppIdQuery, GetArticlesByVirtualAppIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticlesByVirtualAppIdQuery, GetArticlesByVirtualAppIdQueryVariables>(GetArticlesByVirtualAppIdDocument, options);
        }
export type GetArticlesByVirtualAppIdQueryHookResult = ReturnType<typeof useGetArticlesByVirtualAppIdQuery>;
export type GetArticlesByVirtualAppIdLazyQueryHookResult = ReturnType<typeof useGetArticlesByVirtualAppIdLazyQuery>;
export type GetArticlesByVirtualAppIdQueryResult = Apollo.QueryResult<GetArticlesByVirtualAppIdQuery, GetArticlesByVirtualAppIdQueryVariables>;
export const GetCoursesByVirtualAppIdDocument = gql`
    query getCoursesByVirtualAppId($virtualAppId: String!) {
  getCoursesByVirtualAppId(virtualAppId: $virtualAppId) {
    id
    userId
    tagId
    virtualAppId
    name
    description
    active
    commentType
    createdAt
    defaultImage
    courseImage
    thumbnail
    lessonCount
    courseVideosCount
  }
}
    `;

/**
 * __useGetCoursesByVirtualAppIdQuery__
 *
 * To run a query within a React component, call `useGetCoursesByVirtualAppIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoursesByVirtualAppIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoursesByVirtualAppIdQuery({
 *   variables: {
 *      virtualAppId: // value for 'virtualAppId'
 *   },
 * });
 */
export function useGetCoursesByVirtualAppIdQuery(baseOptions: Apollo.QueryHookOptions<GetCoursesByVirtualAppIdQuery, GetCoursesByVirtualAppIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoursesByVirtualAppIdQuery, GetCoursesByVirtualAppIdQueryVariables>(GetCoursesByVirtualAppIdDocument, options);
      }
export function useGetCoursesByVirtualAppIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoursesByVirtualAppIdQuery, GetCoursesByVirtualAppIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoursesByVirtualAppIdQuery, GetCoursesByVirtualAppIdQueryVariables>(GetCoursesByVirtualAppIdDocument, options);
        }
export type GetCoursesByVirtualAppIdQueryHookResult = ReturnType<typeof useGetCoursesByVirtualAppIdQuery>;
export type GetCoursesByVirtualAppIdLazyQueryHookResult = ReturnType<typeof useGetCoursesByVirtualAppIdLazyQuery>;
export type GetCoursesByVirtualAppIdQueryResult = Apollo.QueryResult<GetCoursesByVirtualAppIdQuery, GetCoursesByVirtualAppIdQueryVariables>;
export const CheckPhoneDocument = gql`
    mutation checkPhone($phone: String!) {
  checkPhone(phone: $phone)
}
    `;
export type CheckPhoneMutationFn = Apollo.MutationFunction<CheckPhoneMutation, CheckPhoneMutationVariables>;

/**
 * __useCheckPhoneMutation__
 *
 * To run a mutation, you first call `useCheckPhoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckPhoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkPhoneMutation, { data, loading, error }] = useCheckPhoneMutation({
 *   variables: {
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useCheckPhoneMutation(baseOptions?: Apollo.MutationHookOptions<CheckPhoneMutation, CheckPhoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckPhoneMutation, CheckPhoneMutationVariables>(CheckPhoneDocument, options);
      }
export type CheckPhoneMutationHookResult = ReturnType<typeof useCheckPhoneMutation>;
export type CheckPhoneMutationResult = Apollo.MutationResult<CheckPhoneMutation>;
export type CheckPhoneMutationOptions = Apollo.BaseMutationOptions<CheckPhoneMutation, CheckPhoneMutationVariables>;
export const LoginDocument = gql`
    mutation login($phone: String!, $password: String!) {
  login(phone: $phone, password: $password) {
    userIdToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      phone: // value for 'phone'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetUserInfoDocument = gql`
    query getUserInfo {
  getUser {
    id
    userName
    email
    phone
    type
    isFirstLogin
    virtualApps {
      id
      name
      highlightColor
      logo
      backgroundColor
      mediaHost
    }
  }
}
    `;

/**
 * __useGetUserInfoQuery__
 *
 * To run a query within a React component, call `useGetUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
      }
export function useGetUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
        }
export type GetUserInfoQueryHookResult = ReturnType<typeof useGetUserInfoQuery>;
export type GetUserInfoLazyQueryHookResult = ReturnType<typeof useGetUserInfoLazyQuery>;
export type GetUserInfoQueryResult = Apollo.QueryResult<GetUserInfoQuery, GetUserInfoQueryVariables>;
export const UploadImageFileToFirestoreDocument = gql`
    mutation UploadImageFileToFirestore($userId: String!, $folderId: String!, $folder: String!, $file: Upload!, $imageType: ImageFileType!) {
  uploadImageFileToFirestore(
    userId: $userId
    folderId: $folderId
    folder: $folder
    file: $file
    imageType: $imageType
  ) {
    filename
    mimetype
    encoding
    downloadLink
  }
}
    `;
export type UploadImageFileToFirestoreMutationFn = Apollo.MutationFunction<UploadImageFileToFirestoreMutation, UploadImageFileToFirestoreMutationVariables>;

/**
 * __useUploadImageFileToFirestoreMutation__
 *
 * To run a mutation, you first call `useUploadImageFileToFirestoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageFileToFirestoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageFileToFirestoreMutation, { data, loading, error }] = useUploadImageFileToFirestoreMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      folderId: // value for 'folderId'
 *      folder: // value for 'folder'
 *      file: // value for 'file'
 *      imageType: // value for 'imageType'
 *   },
 * });
 */
export function useUploadImageFileToFirestoreMutation(baseOptions?: Apollo.MutationHookOptions<UploadImageFileToFirestoreMutation, UploadImageFileToFirestoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadImageFileToFirestoreMutation, UploadImageFileToFirestoreMutationVariables>(UploadImageFileToFirestoreDocument, options);
      }
export type UploadImageFileToFirestoreMutationHookResult = ReturnType<typeof useUploadImageFileToFirestoreMutation>;
export type UploadImageFileToFirestoreMutationResult = Apollo.MutationResult<UploadImageFileToFirestoreMutation>;
export type UploadImageFileToFirestoreMutationOptions = Apollo.BaseMutationOptions<UploadImageFileToFirestoreMutation, UploadImageFileToFirestoreMutationVariables>;
export const UploadFileToFirestoreDocument = gql`
    mutation UploadFileToFirestore($userId: String!, $folderId: String!, $folder: String!, $file: Upload!) {
  uploadFileToFirestore(
    userId: $userId
    folderId: $folderId
    folder: $folder
    file: $file
  ) {
    filename
    mimetype
    encoding
    downloadLink
  }
}
    `;
export type UploadFileToFirestoreMutationFn = Apollo.MutationFunction<UploadFileToFirestoreMutation, UploadFileToFirestoreMutationVariables>;

/**
 * __useUploadFileToFirestoreMutation__
 *
 * To run a mutation, you first call `useUploadFileToFirestoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileToFirestoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileToFirestoreMutation, { data, loading, error }] = useUploadFileToFirestoreMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      folderId: // value for 'folderId'
 *      folder: // value for 'folder'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadFileToFirestoreMutation(baseOptions?: Apollo.MutationHookOptions<UploadFileToFirestoreMutation, UploadFileToFirestoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadFileToFirestoreMutation, UploadFileToFirestoreMutationVariables>(UploadFileToFirestoreDocument, options);
      }
export type UploadFileToFirestoreMutationHookResult = ReturnType<typeof useUploadFileToFirestoreMutation>;
export type UploadFileToFirestoreMutationResult = Apollo.MutationResult<UploadFileToFirestoreMutation>;
export type UploadFileToFirestoreMutationOptions = Apollo.BaseMutationOptions<UploadFileToFirestoreMutation, UploadFileToFirestoreMutationVariables>;
export const RemoveMenuItemDocument = gql`
    mutation RemoveMenuItem($path: String!) {
  removeMenuItem(path: $path)
}
    `;
export type RemoveMenuItemMutationFn = Apollo.MutationFunction<RemoveMenuItemMutation, RemoveMenuItemMutationVariables>;

/**
 * __useRemoveMenuItemMutation__
 *
 * To run a mutation, you first call `useRemoveMenuItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMenuItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMenuItemMutation, { data, loading, error }] = useRemoveMenuItemMutation({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useRemoveMenuItemMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMenuItemMutation, RemoveMenuItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMenuItemMutation, RemoveMenuItemMutationVariables>(RemoveMenuItemDocument, options);
      }
export type RemoveMenuItemMutationHookResult = ReturnType<typeof useRemoveMenuItemMutation>;
export type RemoveMenuItemMutationResult = Apollo.MutationResult<RemoveMenuItemMutation>;
export type RemoveMenuItemMutationOptions = Apollo.BaseMutationOptions<RemoveMenuItemMutation, RemoveMenuItemMutationVariables>;
export const OrderMenuItemsDocument = gql`
    mutation OrderMenuItems($path: String!, $menuItemsIds: [String!]!) {
  orderMenuItems(path: $path, menuItemsIds: $menuItemsIds)
}
    `;
export type OrderMenuItemsMutationFn = Apollo.MutationFunction<OrderMenuItemsMutation, OrderMenuItemsMutationVariables>;

/**
 * __useOrderMenuItemsMutation__
 *
 * To run a mutation, you first call `useOrderMenuItemsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderMenuItemsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderMenuItemsMutation, { data, loading, error }] = useOrderMenuItemsMutation({
 *   variables: {
 *      path: // value for 'path'
 *      menuItemsIds: // value for 'menuItemsIds'
 *   },
 * });
 */
export function useOrderMenuItemsMutation(baseOptions?: Apollo.MutationHookOptions<OrderMenuItemsMutation, OrderMenuItemsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderMenuItemsMutation, OrderMenuItemsMutationVariables>(OrderMenuItemsDocument, options);
      }
export type OrderMenuItemsMutationHookResult = ReturnType<typeof useOrderMenuItemsMutation>;
export type OrderMenuItemsMutationResult = Apollo.MutationResult<OrderMenuItemsMutation>;
export type OrderMenuItemsMutationOptions = Apollo.BaseMutationOptions<OrderMenuItemsMutation, OrderMenuItemsMutationVariables>;
export const GetMenuPageByPathDocument = gql`
    query GetMenuPageByPath($path: String!) {
  getMenuPageByPath(path: $path) {
    image
    imageTitle
    active
    link
  }
}
    `;

/**
 * __useGetMenuPageByPathQuery__
 *
 * To run a query within a React component, call `useGetMenuPageByPathQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMenuPageByPathQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMenuPageByPathQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useGetMenuPageByPathQuery(baseOptions: Apollo.QueryHookOptions<GetMenuPageByPathQuery, GetMenuPageByPathQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMenuPageByPathQuery, GetMenuPageByPathQueryVariables>(GetMenuPageByPathDocument, options);
      }
export function useGetMenuPageByPathLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMenuPageByPathQuery, GetMenuPageByPathQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMenuPageByPathQuery, GetMenuPageByPathQueryVariables>(GetMenuPageByPathDocument, options);
        }
export type GetMenuPageByPathQueryHookResult = ReturnType<typeof useGetMenuPageByPathQuery>;
export type GetMenuPageByPathLazyQueryHookResult = ReturnType<typeof useGetMenuPageByPathLazyQuery>;
export type GetMenuPageByPathQueryResult = Apollo.QueryResult<GetMenuPageByPathQuery, GetMenuPageByPathQueryVariables>;
export const GetMenuItemsByPathDocument = gql`
    query GetMenuItemsByPath($path: String!) {
  getMenuItemsByPath(path: $path) {
    id
    menuId
    name
    description
    order
    path
    type
    thumbnail
    active
    background
  }
}
    `;

/**
 * __useGetMenuItemsByPathQuery__
 *
 * To run a query within a React component, call `useGetMenuItemsByPathQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMenuItemsByPathQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMenuItemsByPathQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useGetMenuItemsByPathQuery(baseOptions: Apollo.QueryHookOptions<GetMenuItemsByPathQuery, GetMenuItemsByPathQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMenuItemsByPathQuery, GetMenuItemsByPathQueryVariables>(GetMenuItemsByPathDocument, options);
      }
export function useGetMenuItemsByPathLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMenuItemsByPathQuery, GetMenuItemsByPathQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMenuItemsByPathQuery, GetMenuItemsByPathQueryVariables>(GetMenuItemsByPathDocument, options);
        }
export type GetMenuItemsByPathQueryHookResult = ReturnType<typeof useGetMenuItemsByPathQuery>;
export type GetMenuItemsByPathLazyQueryHookResult = ReturnType<typeof useGetMenuItemsByPathLazyQuery>;
export type GetMenuItemsByPathQueryResult = Apollo.QueryResult<GetMenuItemsByPathQuery, GetMenuItemsByPathQueryVariables>;
export const GetAppSettingsDocument = gql`
    query GetAppSettings($virtualAppId: String!) {
  getVirtualApp(virtualAppId: $virtualAppId) {
    titleBarColor
    logo
    highlightColor
    ctaColor
    backgroundColor
    name
    bottomBarPref
    bottombarHidden
    appKey
    notificationIntervalHour
    inviteUserLink
  }
}
    `;

/**
 * __useGetAppSettingsQuery__
 *
 * To run a query within a React component, call `useGetAppSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppSettingsQuery({
 *   variables: {
 *      virtualAppId: // value for 'virtualAppId'
 *   },
 * });
 */
export function useGetAppSettingsQuery(baseOptions: Apollo.QueryHookOptions<GetAppSettingsQuery, GetAppSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAppSettingsQuery, GetAppSettingsQueryVariables>(GetAppSettingsDocument, options);
      }
export function useGetAppSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAppSettingsQuery, GetAppSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAppSettingsQuery, GetAppSettingsQueryVariables>(GetAppSettingsDocument, options);
        }
export type GetAppSettingsQueryHookResult = ReturnType<typeof useGetAppSettingsQuery>;
export type GetAppSettingsLazyQueryHookResult = ReturnType<typeof useGetAppSettingsLazyQuery>;
export type GetAppSettingsQueryResult = Apollo.QueryResult<GetAppSettingsQuery, GetAppSettingsQueryVariables>;
export const GetProfileDocument = gql`
    query GetProfile($virtualAppId: String!) {
  getVirtualApp(virtualAppId: $virtualAppId) {
    companyName
    companyNiche
    companyHelpEmail
    companyHelpCenter
    companyCountryCode
    companyPhoneNumber
    companyZipCode
    companyCity
    companyAddress
    companyCountry
    companyState
    appOwnerName
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      virtualAppId: // value for 'virtualAppId'
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const UpdateVirtualAppDocument = gql`
    mutation UpdateVirtualApp($virtualAppId: String!, $data: UpdateVirtualAppInput!) {
  updateVirtualApp(virtualAppId: $virtualAppId, data: $data)
}
    `;
export type UpdateVirtualAppMutationFn = Apollo.MutationFunction<UpdateVirtualAppMutation, UpdateVirtualAppMutationVariables>;

/**
 * __useUpdateVirtualAppMutation__
 *
 * To run a mutation, you first call `useUpdateVirtualAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVirtualAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVirtualAppMutation, { data, loading, error }] = useUpdateVirtualAppMutation({
 *   variables: {
 *      virtualAppId: // value for 'virtualAppId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateVirtualAppMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVirtualAppMutation, UpdateVirtualAppMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVirtualAppMutation, UpdateVirtualAppMutationVariables>(UpdateVirtualAppDocument, options);
      }
export type UpdateVirtualAppMutationHookResult = ReturnType<typeof useUpdateVirtualAppMutation>;
export type UpdateVirtualAppMutationResult = Apollo.MutationResult<UpdateVirtualAppMutation>;
export type UpdateVirtualAppMutationOptions = Apollo.BaseMutationOptions<UpdateVirtualAppMutation, UpdateVirtualAppMutationVariables>;
export const CompleteTestDriveSignUpDocument = gql`
    mutation CompleteTestDriveSignUp($vApp: CreateVirtualAppInput!, $newPassword: String!) {
  completeTestDriveSignUp(vApp: $vApp, newPassword: $newPassword)
}
    `;
export type CompleteTestDriveSignUpMutationFn = Apollo.MutationFunction<CompleteTestDriveSignUpMutation, CompleteTestDriveSignUpMutationVariables>;

/**
 * __useCompleteTestDriveSignUpMutation__
 *
 * To run a mutation, you first call `useCompleteTestDriveSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteTestDriveSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeTestDriveSignUpMutation, { data, loading, error }] = useCompleteTestDriveSignUpMutation({
 *   variables: {
 *      vApp: // value for 'vApp'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useCompleteTestDriveSignUpMutation(baseOptions?: Apollo.MutationHookOptions<CompleteTestDriveSignUpMutation, CompleteTestDriveSignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteTestDriveSignUpMutation, CompleteTestDriveSignUpMutationVariables>(CompleteTestDriveSignUpDocument, options);
      }
export type CompleteTestDriveSignUpMutationHookResult = ReturnType<typeof useCompleteTestDriveSignUpMutation>;
export type CompleteTestDriveSignUpMutationResult = Apollo.MutationResult<CompleteTestDriveSignUpMutation>;
export type CompleteTestDriveSignUpMutationOptions = Apollo.BaseMutationOptions<CompleteTestDriveSignUpMutation, CompleteTestDriveSignUpMutationVariables>;
export const GetCoursesByVirtualAppIdFormUploaderDocument = gql`
    query GetCoursesByVirtualAppIdFormUploader($virtualAppId: String!) {
  getCoursesByVirtualAppId(virtualAppId: $virtualAppId) {
    name
    id
  }
}
    `;

/**
 * __useGetCoursesByVirtualAppIdFormUploaderQuery__
 *
 * To run a query within a React component, call `useGetCoursesByVirtualAppIdFormUploaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoursesByVirtualAppIdFormUploaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoursesByVirtualAppIdFormUploaderQuery({
 *   variables: {
 *      virtualAppId: // value for 'virtualAppId'
 *   },
 * });
 */
export function useGetCoursesByVirtualAppIdFormUploaderQuery(baseOptions: Apollo.QueryHookOptions<GetCoursesByVirtualAppIdFormUploaderQuery, GetCoursesByVirtualAppIdFormUploaderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoursesByVirtualAppIdFormUploaderQuery, GetCoursesByVirtualAppIdFormUploaderQueryVariables>(GetCoursesByVirtualAppIdFormUploaderDocument, options);
      }
export function useGetCoursesByVirtualAppIdFormUploaderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoursesByVirtualAppIdFormUploaderQuery, GetCoursesByVirtualAppIdFormUploaderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoursesByVirtualAppIdFormUploaderQuery, GetCoursesByVirtualAppIdFormUploaderQueryVariables>(GetCoursesByVirtualAppIdFormUploaderDocument, options);
        }
export type GetCoursesByVirtualAppIdFormUploaderQueryHookResult = ReturnType<typeof useGetCoursesByVirtualAppIdFormUploaderQuery>;
export type GetCoursesByVirtualAppIdFormUploaderLazyQueryHookResult = ReturnType<typeof useGetCoursesByVirtualAppIdFormUploaderLazyQuery>;
export type GetCoursesByVirtualAppIdFormUploaderQueryResult = Apollo.QueryResult<GetCoursesByVirtualAppIdFormUploaderQuery, GetCoursesByVirtualAppIdFormUploaderQueryVariables>;
export const GetTopicsByCourseIdFormUploaderDocument = gql`
    query GetTopicsByCourseIdFormUploader($courseId: String!) {
  getTopicsByCourseId(courseId: $courseId) {
    id
    title
  }
}
    `;

/**
 * __useGetTopicsByCourseIdFormUploaderQuery__
 *
 * To run a query within a React component, call `useGetTopicsByCourseIdFormUploaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicsByCourseIdFormUploaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicsByCourseIdFormUploaderQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useGetTopicsByCourseIdFormUploaderQuery(baseOptions: Apollo.QueryHookOptions<GetTopicsByCourseIdFormUploaderQuery, GetTopicsByCourseIdFormUploaderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopicsByCourseIdFormUploaderQuery, GetTopicsByCourseIdFormUploaderQueryVariables>(GetTopicsByCourseIdFormUploaderDocument, options);
      }
export function useGetTopicsByCourseIdFormUploaderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicsByCourseIdFormUploaderQuery, GetTopicsByCourseIdFormUploaderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopicsByCourseIdFormUploaderQuery, GetTopicsByCourseIdFormUploaderQueryVariables>(GetTopicsByCourseIdFormUploaderDocument, options);
        }
export type GetTopicsByCourseIdFormUploaderQueryHookResult = ReturnType<typeof useGetTopicsByCourseIdFormUploaderQuery>;
export type GetTopicsByCourseIdFormUploaderLazyQueryHookResult = ReturnType<typeof useGetTopicsByCourseIdFormUploaderLazyQuery>;
export type GetTopicsByCourseIdFormUploaderQueryResult = Apollo.QueryResult<GetTopicsByCourseIdFormUploaderQuery, GetTopicsByCourseIdFormUploaderQueryVariables>;
export const SendNotificationToMyselfDocument = gql`
    mutation SendNotificationToMyself($title: String!, $description: String!, $virtualAppId: String!, $lessonId: String!) {
  sendNotificationToMyself(
    title: $title
    description: $description
    virtualAppId: $virtualAppId
    lessonId: $lessonId
  )
}
    `;
export type SendNotificationToMyselfMutationFn = Apollo.MutationFunction<SendNotificationToMyselfMutation, SendNotificationToMyselfMutationVariables>;

/**
 * __useSendNotificationToMyselfMutation__
 *
 * To run a mutation, you first call `useSendNotificationToMyselfMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendNotificationToMyselfMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendNotificationToMyselfMutation, { data, loading, error }] = useSendNotificationToMyselfMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      virtualAppId: // value for 'virtualAppId'
 *      lessonId: // value for 'lessonId'
 *   },
 * });
 */
export function useSendNotificationToMyselfMutation(baseOptions?: Apollo.MutationHookOptions<SendNotificationToMyselfMutation, SendNotificationToMyselfMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendNotificationToMyselfMutation, SendNotificationToMyselfMutationVariables>(SendNotificationToMyselfDocument, options);
      }
export type SendNotificationToMyselfMutationHookResult = ReturnType<typeof useSendNotificationToMyselfMutation>;
export type SendNotificationToMyselfMutationResult = Apollo.MutationResult<SendNotificationToMyselfMutation>;
export type SendNotificationToMyselfMutationOptions = Apollo.BaseMutationOptions<SendNotificationToMyselfMutation, SendNotificationToMyselfMutationVariables>;
export const CreateLessonByVideoUploadingDocument = gql`
    mutation createLessonByVideoUploading($courseId: String!, $topicId: String!, $data: CreateLessonInput!) {
  createLessonByVideoUploading(
    courseId: $courseId
    topicId: $topicId
    data: $data
  ) {
    id
    topicId
    title
    description
    active
    order
  }
}
    `;
export type CreateLessonByVideoUploadingMutationFn = Apollo.MutationFunction<CreateLessonByVideoUploadingMutation, CreateLessonByVideoUploadingMutationVariables>;

/**
 * __useCreateLessonByVideoUploadingMutation__
 *
 * To run a mutation, you first call `useCreateLessonByVideoUploadingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLessonByVideoUploadingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLessonByVideoUploadingMutation, { data, loading, error }] = useCreateLessonByVideoUploadingMutation({
 *   variables: {
 *      courseId: // value for 'courseId'
 *      topicId: // value for 'topicId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateLessonByVideoUploadingMutation(baseOptions?: Apollo.MutationHookOptions<CreateLessonByVideoUploadingMutation, CreateLessonByVideoUploadingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLessonByVideoUploadingMutation, CreateLessonByVideoUploadingMutationVariables>(CreateLessonByVideoUploadingDocument, options);
      }
export type CreateLessonByVideoUploadingMutationHookResult = ReturnType<typeof useCreateLessonByVideoUploadingMutation>;
export type CreateLessonByVideoUploadingMutationResult = Apollo.MutationResult<CreateLessonByVideoUploadingMutation>;
export type CreateLessonByVideoUploadingMutationOptions = Apollo.BaseMutationOptions<CreateLessonByVideoUploadingMutation, CreateLessonByVideoUploadingMutationVariables>;
export const GetCoursesByVirtualAppIdFormUploaderOldDocument = gql`
    query GetCoursesByVirtualAppIdFormUploaderOld($virtualAppId: String!) {
  getCoursesByVirtualAppId(virtualAppId: $virtualAppId) {
    name
    id
  }
}
    `;

/**
 * __useGetCoursesByVirtualAppIdFormUploaderOldQuery__
 *
 * To run a query within a React component, call `useGetCoursesByVirtualAppIdFormUploaderOldQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoursesByVirtualAppIdFormUploaderOldQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoursesByVirtualAppIdFormUploaderOldQuery({
 *   variables: {
 *      virtualAppId: // value for 'virtualAppId'
 *   },
 * });
 */
export function useGetCoursesByVirtualAppIdFormUploaderOldQuery(baseOptions: Apollo.QueryHookOptions<GetCoursesByVirtualAppIdFormUploaderOldQuery, GetCoursesByVirtualAppIdFormUploaderOldQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoursesByVirtualAppIdFormUploaderOldQuery, GetCoursesByVirtualAppIdFormUploaderOldQueryVariables>(GetCoursesByVirtualAppIdFormUploaderOldDocument, options);
      }
export function useGetCoursesByVirtualAppIdFormUploaderOldLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoursesByVirtualAppIdFormUploaderOldQuery, GetCoursesByVirtualAppIdFormUploaderOldQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoursesByVirtualAppIdFormUploaderOldQuery, GetCoursesByVirtualAppIdFormUploaderOldQueryVariables>(GetCoursesByVirtualAppIdFormUploaderOldDocument, options);
        }
export type GetCoursesByVirtualAppIdFormUploaderOldQueryHookResult = ReturnType<typeof useGetCoursesByVirtualAppIdFormUploaderOldQuery>;
export type GetCoursesByVirtualAppIdFormUploaderOldLazyQueryHookResult = ReturnType<typeof useGetCoursesByVirtualAppIdFormUploaderOldLazyQuery>;
export type GetCoursesByVirtualAppIdFormUploaderOldQueryResult = Apollo.QueryResult<GetCoursesByVirtualAppIdFormUploaderOldQuery, GetCoursesByVirtualAppIdFormUploaderOldQueryVariables>;
export const InitEncodeVideoDocument = gql`
    mutation InitEncodeVideo($courseId: String!, $topicId: String!, $lessonId: String!, $fileId: String!, $virtualAppId: String!, $filePath: String!, $fileName: String!, $fileSize: Float!, $createdAt: String!, $fileDuration: Float!, $status: String!) {
  initEncodeVideo(
    courseId: $courseId
    topicId: $topicId
    lessonId: $lessonId
    fileId: $fileId
    virtualAppId: $virtualAppId
    filePath: $filePath
    fileName: $fileName
    fileSize: $fileSize
    createdAt: $createdAt
    fileDuration: $fileDuration
    status: $status
  )
}
    `;
export type InitEncodeVideoMutationFn = Apollo.MutationFunction<InitEncodeVideoMutation, InitEncodeVideoMutationVariables>;

/**
 * __useInitEncodeVideoMutation__
 *
 * To run a mutation, you first call `useInitEncodeVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitEncodeVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initEncodeVideoMutation, { data, loading, error }] = useInitEncodeVideoMutation({
 *   variables: {
 *      courseId: // value for 'courseId'
 *      topicId: // value for 'topicId'
 *      lessonId: // value for 'lessonId'
 *      fileId: // value for 'fileId'
 *      virtualAppId: // value for 'virtualAppId'
 *      filePath: // value for 'filePath'
 *      fileName: // value for 'fileName'
 *      fileSize: // value for 'fileSize'
 *      createdAt: // value for 'createdAt'
 *      fileDuration: // value for 'fileDuration'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useInitEncodeVideoMutation(baseOptions?: Apollo.MutationHookOptions<InitEncodeVideoMutation, InitEncodeVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InitEncodeVideoMutation, InitEncodeVideoMutationVariables>(InitEncodeVideoDocument, options);
      }
export type InitEncodeVideoMutationHookResult = ReturnType<typeof useInitEncodeVideoMutation>;
export type InitEncodeVideoMutationResult = Apollo.MutationResult<InitEncodeVideoMutation>;
export type InitEncodeVideoMutationOptions = Apollo.BaseMutationOptions<InitEncodeVideoMutation, InitEncodeVideoMutationVariables>;
export const CreateMediaDocument = gql`
    mutation CreateMedia($fileId: String!, $virtualAppId: String!, $filePath: String!, $fileUrl: String!, $type: MediaManagerTypeEnum!, $actived: Boolean!, $name: String!, $extension: String!, $thumbVideoUrl: String) {
  createMedia(
    fileId: $fileId
    virtualAppId: $virtualAppId
    filePath: $filePath
    fileUrl: $fileUrl
    type: $type
    actived: $actived
    name: $name
    extension: $extension
    thumbVideoUrl: $thumbVideoUrl
  )
}
    `;
export type CreateMediaMutationFn = Apollo.MutationFunction<CreateMediaMutation, CreateMediaMutationVariables>;

/**
 * __useCreateMediaMutation__
 *
 * To run a mutation, you first call `useCreateMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMediaMutation, { data, loading, error }] = useCreateMediaMutation({
 *   variables: {
 *      fileId: // value for 'fileId'
 *      virtualAppId: // value for 'virtualAppId'
 *      filePath: // value for 'filePath'
 *      fileUrl: // value for 'fileUrl'
 *      type: // value for 'type'
 *      actived: // value for 'actived'
 *      name: // value for 'name'
 *      extension: // value for 'extension'
 *      thumbVideoUrl: // value for 'thumbVideoUrl'
 *   },
 * });
 */
export function useCreateMediaMutation(baseOptions?: Apollo.MutationHookOptions<CreateMediaMutation, CreateMediaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMediaMutation, CreateMediaMutationVariables>(CreateMediaDocument, options);
      }
export type CreateMediaMutationHookResult = ReturnType<typeof useCreateMediaMutation>;
export type CreateMediaMutationResult = Apollo.MutationResult<CreateMediaMutation>;
export type CreateMediaMutationOptions = Apollo.BaseMutationOptions<CreateMediaMutation, CreateMediaMutationVariables>;
export const UpdateByVideoUploadingDocument = gql`
    mutation updateByVideoUploading($courseId: String!, $topicId: String!, $lessonId: String!, $data: UpdateLessonInput!) {
  updateByVideoUploading(
    courseId: $courseId
    topicId: $topicId
    lessonId: $lessonId
    data: $data
  )
}
    `;
export type UpdateByVideoUploadingMutationFn = Apollo.MutationFunction<UpdateByVideoUploadingMutation, UpdateByVideoUploadingMutationVariables>;

/**
 * __useUpdateByVideoUploadingMutation__
 *
 * To run a mutation, you first call `useUpdateByVideoUploadingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateByVideoUploadingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateByVideoUploadingMutation, { data, loading, error }] = useUpdateByVideoUploadingMutation({
 *   variables: {
 *      courseId: // value for 'courseId'
 *      topicId: // value for 'topicId'
 *      lessonId: // value for 'lessonId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateByVideoUploadingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateByVideoUploadingMutation, UpdateByVideoUploadingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateByVideoUploadingMutation, UpdateByVideoUploadingMutationVariables>(UpdateByVideoUploadingDocument, options);
      }
export type UpdateByVideoUploadingMutationHookResult = ReturnType<typeof useUpdateByVideoUploadingMutation>;
export type UpdateByVideoUploadingMutationResult = Apollo.MutationResult<UpdateByVideoUploadingMutation>;
export type UpdateByVideoUploadingMutationOptions = Apollo.BaseMutationOptions<UpdateByVideoUploadingMutation, UpdateByVideoUploadingMutationVariables>;
export const GetContactsFromVirtualAppDocument = gql`
    query GetContactsFromVirtualApp($virtualAppId: String!) {
  getVirtualApp(virtualAppId: $virtualAppId) {
    contacts {
      id
      userFirstName
      userLastName
      createdAt
      countryCode
      userMobile
      active
      userEmail
    }
  }
}
    `;

/**
 * __useGetContactsFromVirtualAppQuery__
 *
 * To run a query within a React component, call `useGetContactsFromVirtualAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContactsFromVirtualAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContactsFromVirtualAppQuery({
 *   variables: {
 *      virtualAppId: // value for 'virtualAppId'
 *   },
 * });
 */
export function useGetContactsFromVirtualAppQuery(baseOptions: Apollo.QueryHookOptions<GetContactsFromVirtualAppQuery, GetContactsFromVirtualAppQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContactsFromVirtualAppQuery, GetContactsFromVirtualAppQueryVariables>(GetContactsFromVirtualAppDocument, options);
      }
export function useGetContactsFromVirtualAppLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContactsFromVirtualAppQuery, GetContactsFromVirtualAppQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContactsFromVirtualAppQuery, GetContactsFromVirtualAppQueryVariables>(GetContactsFromVirtualAppDocument, options);
        }
export type GetContactsFromVirtualAppQueryHookResult = ReturnType<typeof useGetContactsFromVirtualAppQuery>;
export type GetContactsFromVirtualAppLazyQueryHookResult = ReturnType<typeof useGetContactsFromVirtualAppLazyQuery>;
export type GetContactsFromVirtualAppQueryResult = Apollo.QueryResult<GetContactsFromVirtualAppQuery, GetContactsFromVirtualAppQueryVariables>;
export const CreateArticleDocument = gql`
    mutation CreateArticle($data: CreateArticleInput!) {
  createArticle(data: $data) {
    id
    userId
    virtualAppId
    name
    author
    text
    description
    publishDate
    tagIDs
    image
    mediaUrl
    active
    thumbnail
  }
}
    `;
export type CreateArticleMutationFn = Apollo.MutationFunction<CreateArticleMutation, CreateArticleMutationVariables>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateArticleMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument, options);
      }
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationResult = Apollo.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = Apollo.BaseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>;
export const UpdateArticleDocument = gql`
    mutation UpdateArticle($data: UpdateArticleInput!) {
  updateArticle(data: $data)
}
    `;
export type UpdateArticleMutationFn = Apollo.MutationFunction<UpdateArticleMutation, UpdateArticleMutationVariables>;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateArticleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArticleMutation, UpdateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleDocument, options);
      }
export type UpdateArticleMutationHookResult = ReturnType<typeof useUpdateArticleMutation>;
export type UpdateArticleMutationResult = Apollo.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationOptions = Apollo.BaseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables>;
export const GetArticleDocument = gql`
    query GetArticle($articleId: String!) {
  getArticle(articleId: $articleId) {
    restrictionType
    protected
    userId
    articleMinutes
    isHtml
    id
    virtualAppId
    name
    author
    text
    description
    active
    articleType
    tagIDs
    publishDate
    createdAt
    image
    mediaUrl
    thumbnail
    videoThumbnail
  }
}
    `;

/**
 * __useGetArticleQuery__
 *
 * To run a query within a React component, call `useGetArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticleQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useGetArticleQuery(baseOptions: Apollo.QueryHookOptions<GetArticleQuery, GetArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticleQuery, GetArticleQueryVariables>(GetArticleDocument, options);
      }
export function useGetArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticleQuery, GetArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticleQuery, GetArticleQueryVariables>(GetArticleDocument, options);
        }
export type GetArticleQueryHookResult = ReturnType<typeof useGetArticleQuery>;
export type GetArticleLazyQueryHookResult = ReturnType<typeof useGetArticleLazyQuery>;
export type GetArticleQueryResult = Apollo.QueryResult<GetArticleQuery, GetArticleQueryVariables>;
export const RemoveArticleDocument = gql`
    mutation RemoveArticle($articleId: String!) {
  removeArticle(articleId: $articleId)
}
    `;
export type RemoveArticleMutationFn = Apollo.MutationFunction<RemoveArticleMutation, RemoveArticleMutationVariables>;

/**
 * __useRemoveArticleMutation__
 *
 * To run a mutation, you first call `useRemoveArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeArticleMutation, { data, loading, error }] = useRemoveArticleMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useRemoveArticleMutation(baseOptions?: Apollo.MutationHookOptions<RemoveArticleMutation, RemoveArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveArticleMutation, RemoveArticleMutationVariables>(RemoveArticleDocument, options);
      }
export type RemoveArticleMutationHookResult = ReturnType<typeof useRemoveArticleMutation>;
export type RemoveArticleMutationResult = Apollo.MutationResult<RemoveArticleMutation>;
export type RemoveArticleMutationOptions = Apollo.BaseMutationOptions<RemoveArticleMutation, RemoveArticleMutationVariables>;
export const RemoveCourseDocument = gql`
    mutation RemoveCourse($courseId: String!) {
  removeCourse(courseId: $courseId)
}
    `;
export type RemoveCourseMutationFn = Apollo.MutationFunction<RemoveCourseMutation, RemoveCourseMutationVariables>;

/**
 * __useRemoveCourseMutation__
 *
 * To run a mutation, you first call `useRemoveCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCourseMutation, { data, loading, error }] = useRemoveCourseMutation({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useRemoveCourseMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCourseMutation, RemoveCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCourseMutation, RemoveCourseMutationVariables>(RemoveCourseDocument, options);
      }
export type RemoveCourseMutationHookResult = ReturnType<typeof useRemoveCourseMutation>;
export type RemoveCourseMutationResult = Apollo.MutationResult<RemoveCourseMutation>;
export type RemoveCourseMutationOptions = Apollo.BaseMutationOptions<RemoveCourseMutation, RemoveCourseMutationVariables>;
export const CreateCourseDocument = gql`
    mutation CreateCourse($data: CreateCourseInput!) {
  createCourse(data: $data) {
    id
    userId
    tagId
    virtualAppId
    name
  }
}
    `;
export type CreateCourseMutationFn = Apollo.MutationFunction<CreateCourseMutation, CreateCourseMutationVariables>;

/**
 * __useCreateCourseMutation__
 *
 * To run a mutation, you first call `useCreateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseMutation, { data, loading, error }] = useCreateCourseMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCourseMutation(baseOptions?: Apollo.MutationHookOptions<CreateCourseMutation, CreateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument, options);
      }
export type CreateCourseMutationHookResult = ReturnType<typeof useCreateCourseMutation>;
export type CreateCourseMutationResult = Apollo.MutationResult<CreateCourseMutation>;
export type CreateCourseMutationOptions = Apollo.BaseMutationOptions<CreateCourseMutation, CreateCourseMutationVariables>;
export const UpdateCourseDocument = gql`
    mutation UpdateCourse($data: UpdateCourseInput!) {
  updateCourse(data: $data)
}
    `;
export type UpdateCourseMutationFn = Apollo.MutationFunction<UpdateCourseMutation, UpdateCourseMutationVariables>;

/**
 * __useUpdateCourseMutation__
 *
 * To run a mutation, you first call `useUpdateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdateCourseMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCourseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseMutation, UpdateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(UpdateCourseDocument, options);
      }
export type UpdateCourseMutationHookResult = ReturnType<typeof useUpdateCourseMutation>;
export type UpdateCourseMutationResult = Apollo.MutationResult<UpdateCourseMutation>;
export type UpdateCourseMutationOptions = Apollo.BaseMutationOptions<UpdateCourseMutation, UpdateCourseMutationVariables>;
export const GetCourseDocument = gql`
    query GetCourse($courseId: String!) {
  getCourse(courseId: $courseId) {
    name
    description
    commentType
    courseAlerts
    restrictionType
    protected
    active
    defaultImage
    courseImage
    thumbnail
    showOrderNumber
  }
}
    `;

/**
 * __useGetCourseQuery__
 *
 * To run a query within a React component, call `useGetCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useGetCourseQuery(baseOptions: Apollo.QueryHookOptions<GetCourseQuery, GetCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCourseQuery, GetCourseQueryVariables>(GetCourseDocument, options);
      }
export function useGetCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCourseQuery, GetCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCourseQuery, GetCourseQueryVariables>(GetCourseDocument, options);
        }
export type GetCourseQueryHookResult = ReturnType<typeof useGetCourseQuery>;
export type GetCourseLazyQueryHookResult = ReturnType<typeof useGetCourseLazyQuery>;
export type GetCourseQueryResult = Apollo.QueryResult<GetCourseQuery, GetCourseQueryVariables>;
export const GetTopicsByCourseIdDocument = gql`
    query getTopicsByCourseId($courseId: String!) {
  getTopicsByCourseId(courseId: $courseId) {
    id
    title
    description
    order
    lessons {
      id
      topicId
      title
      description
      active
      order
      mediaUrl
      thumbnail
      contenttype
    }
  }
}
    `;

/**
 * __useGetTopicsByCourseIdQuery__
 *
 * To run a query within a React component, call `useGetTopicsByCourseIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicsByCourseIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicsByCourseIdQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useGetTopicsByCourseIdQuery(baseOptions: Apollo.QueryHookOptions<GetTopicsByCourseIdQuery, GetTopicsByCourseIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopicsByCourseIdQuery, GetTopicsByCourseIdQueryVariables>(GetTopicsByCourseIdDocument, options);
      }
export function useGetTopicsByCourseIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicsByCourseIdQuery, GetTopicsByCourseIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopicsByCourseIdQuery, GetTopicsByCourseIdQueryVariables>(GetTopicsByCourseIdDocument, options);
        }
export type GetTopicsByCourseIdQueryHookResult = ReturnType<typeof useGetTopicsByCourseIdQuery>;
export type GetTopicsByCourseIdLazyQueryHookResult = ReturnType<typeof useGetTopicsByCourseIdLazyQuery>;
export type GetTopicsByCourseIdQueryResult = Apollo.QueryResult<GetTopicsByCourseIdQuery, GetTopicsByCourseIdQueryVariables>;
export const TestDriveSignUpDocument = gql`
    mutation TestDriveSignUp($countryCode: String!, $phone: String!, $email: String!, $firstName: String!, $lastName: String!) {
  testDriveSignUp(
    countryCode: $countryCode
    phone: $phone
    email: $email
    firstName: $firstName
    lastName: $lastName
  )
}
    `;
export type TestDriveSignUpMutationFn = Apollo.MutationFunction<TestDriveSignUpMutation, TestDriveSignUpMutationVariables>;

/**
 * __useTestDriveSignUpMutation__
 *
 * To run a mutation, you first call `useTestDriveSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestDriveSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testDriveSignUpMutation, { data, loading, error }] = useTestDriveSignUpMutation({
 *   variables: {
 *      countryCode: // value for 'countryCode'
 *      phone: // value for 'phone'
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useTestDriveSignUpMutation(baseOptions?: Apollo.MutationHookOptions<TestDriveSignUpMutation, TestDriveSignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestDriveSignUpMutation, TestDriveSignUpMutationVariables>(TestDriveSignUpDocument, options);
      }
export type TestDriveSignUpMutationHookResult = ReturnType<typeof useTestDriveSignUpMutation>;
export type TestDriveSignUpMutationResult = Apollo.MutationResult<TestDriveSignUpMutation>;
export type TestDriveSignUpMutationOptions = Apollo.BaseMutationOptions<TestDriveSignUpMutation, TestDriveSignUpMutationVariables>;
export const GetVideosLessonByVirtualAppIdDocument = gql`
    query GetVideosLessonByVirtualAppId($vAppId: String!) {
  getVideosLessonByVirtualAppId(vAppId: $vAppId) {
    id
    fileName
    createdAt
    status
    courseName
    lessonName
    lessonId
    topicId
    courseId
  }
}
    `;

/**
 * __useGetVideosLessonByVirtualAppIdQuery__
 *
 * To run a query within a React component, call `useGetVideosLessonByVirtualAppIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideosLessonByVirtualAppIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideosLessonByVirtualAppIdQuery({
 *   variables: {
 *      vAppId: // value for 'vAppId'
 *   },
 * });
 */
export function useGetVideosLessonByVirtualAppIdQuery(baseOptions: Apollo.QueryHookOptions<GetVideosLessonByVirtualAppIdQuery, GetVideosLessonByVirtualAppIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideosLessonByVirtualAppIdQuery, GetVideosLessonByVirtualAppIdQueryVariables>(GetVideosLessonByVirtualAppIdDocument, options);
      }
export function useGetVideosLessonByVirtualAppIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideosLessonByVirtualAppIdQuery, GetVideosLessonByVirtualAppIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideosLessonByVirtualAppIdQuery, GetVideosLessonByVirtualAppIdQueryVariables>(GetVideosLessonByVirtualAppIdDocument, options);
        }
export type GetVideosLessonByVirtualAppIdQueryHookResult = ReturnType<typeof useGetVideosLessonByVirtualAppIdQuery>;
export type GetVideosLessonByVirtualAppIdLazyQueryHookResult = ReturnType<typeof useGetVideosLessonByVirtualAppIdLazyQuery>;
export type GetVideosLessonByVirtualAppIdQueryResult = Apollo.QueryResult<GetVideosLessonByVirtualAppIdQuery, GetVideosLessonByVirtualAppIdQueryVariables>;