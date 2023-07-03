import { ControllersType } from "..";
import { NexusGenInputs, NexusGenRootTypes } from "../generated/nexus-typegen";
import { get } from "lodash";

export type ContactController = ReturnType<typeof initContactController>;

export function initContactController(params: {
  firestore: FirebaseFirestore.Firestore;
  userController: ControllersType["user"];
}) {
  const { firestore, userController } = params;

  async function getByVirtualAppId(
    virtualAppId: string
  ): Promise<Array<NexusGenRootTypes["ContactType"]>> {
    try {
      const contactsRef = firestore
        .doc(`clients/${virtualAppId}`)
        .collection("contacts");
      const querySnapshot = await contactsRef.get();

      let contacts = querySnapshot.docs.map((doc) => {
        const contact = doc.data();

        return {
          id: doc.id,
          billingAddress: contact.billingAddress,
          shippingAddress: contact.shippingAddress,
          userEmail: contact.userEmail,
          userFirstName: contact.userFirstName,
          userLastName: contact.userLastName,
          createdAt: contact.createdAt,
          userImage: contact.userImage,
          userMobile: contact.userMobile,
          userName: contact.userName,
          countryCode: contact.countryCode,
          active: contact.active,
        };
      });

      return contacts;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function findOne(params: { contactId: string; virtualAppId: string }) {
    const { contactId, virtualAppId } = params;

    try {
      const contactsRef = firestore
        .doc(`clients/${virtualAppId}`)
        .collection("contacts")
        .doc(contactId);
      const contactSnapshot = await contactsRef.get();

      const contact = contactSnapshot.data();

      if (!contact)
        throw new Error(`There's no contact with contactId ${contactId}`);

      return {
        id: contactSnapshot.id,
        userEmail: get(contact, "userEmail", ""),
        userFirstName: get(contact, "userFirstName", ""),
        userLastName: get(contact, "userLastName", ""),
        createdAt: get(contact, "createdAt", ""),
        userImage: get(contact, "userImage", ""),
        userMobile: get(contact, "userMobile", ""),
        userName: get(contact, "userName", ""),
        countryCode: get(contact, "countryCode", ""),
        active: get(contact, "active", false),
        billingAddress: contact?.billingAddress || {
          userAddress: get(contact, "billingAddress.userAddress", ""),
          userCity: get(contact, "billingAddress.userCity", ""),
          userCountry: get(contact, "billingAddress.userCountry", ""),
          userState: get(contact, "billingAddress.userState", ""),
          userZipCode: get(contact, "billingAddress.userZipCode", ""),
        },
        shippingAddress: contact?.shippingAddress || {
          userAddress: get(contact, "shippingAddress.userAddress", ""),
          userCity: get(contact, "shippingAddress.userCity", ""),
          userCountry: get(contact, "shippingAddress.userCountry", ""),
          userState: get(contact, "shippingAddress.userState", ""),
          userZipCode: get(contact, "shippingAddress.userZipCode", ""),
        },
      };
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function createContact(params: {
    contact: NexusGenInputs["CreateContactInput"];
    virtualAppId: string;
  }) {
    const { contact, virtualAppId } = params;

    let { userEmail, countryCode, userMobile, userName } = contact;

    if (userEmail) {
      userEmail = userEmail.toLowerCase();
    }

    try {
      // Check there is a user with same phone
      let userDataRequest = await firestore
        .collection("users")
        .where("userName", "==", userName)
        .get();

      // If there is no user with the same phone, check for the e-mail
      if (userDataRequest.empty) {
        userDataRequest = await firestore
          .collection("users")
          .where("userEmail", "==", userEmail)
          .get();
      }

      // Default vAppID
      let vAppId = virtualAppId;

      if (userDataRequest.empty) {
        let userId = "";

        // Create a new User
        if (countryCode && userMobile && userEmail) {
          userId = await userController.createByContactViaPhone({
            countryCode,
            phone: userMobile,
            email: userEmail,
            virtualAppId,
          });
        } else if (userEmail) {
          userId = await userController.createByContactViaEmail({
            email: userEmail,
            virtualAppId,
          });
        }

        // Add user as a contact
        await addContact({ contact, virtualAppId });

        // Add virtual app on user
        await userController.addVirtualApp({
          userId,
          userRole: 3,
          virtualAppId,
        });

        return true;
      } else {
        // Update user
        const user = userDataRequest.docs[0];

        const userVappIds = await firestore
          .collection("users")
          .doc(user.id)
          .collection("virtualApps")
          .get();

        let hasVApp = false;

        // Check the user has the vAppId
        userVappIds.docs.forEach((vApp) => {
          const vAppData = vApp.data();
          if (vAppId === vAppData.vAppId) {
            hasVApp = true;
          }
        });

        if (hasVApp) {
          // This user is already a contact of this app.
          return false;
        } else {
          // Add user as a contact
          await addContact({ contact, virtualAppId });

          // Add virtual app on user
          await userController.addVirtualApp({
            userId: user.id,
            userRole: 3,
            virtualAppId,
          });

          return true;
        }
      }
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function addContact(params: {
    contact: NexusGenInputs["CreateContactInput"];
    virtualAppId: string;
  }) {
    let { contact, virtualAppId } = params;
    try {
      //Get vApp
      const virtualAppRef = firestore.collection("clients").doc(virtualAppId);

      const vAppDocumentSnapshot = await virtualAppRef.get();

      const virtualApp = vAppDocumentSnapshot.data();

      if (!vAppDocumentSnapshot.exists || !virtualApp)
        throw new Error(`There's no vApp with id ${virtualAppId}`);

      //Get Contact
      const contactsRef = virtualAppRef.collection("contacts");

      const contactQuerySnapshot = await contactsRef
        .where("userName", "==", contact.userName)
        .get();

      if (contactQuerySnapshot.docs.length !== 0)
        throw new Error(
          `Contact already exists with userName ${contact.userName}`
        );

      //Get User
      const userQuerySnapshot = await firestore
        .collection("users")
        .where("userName", "==", contact.userName)
        .get();

      if (userQuerySnapshot.docs.length === 0)
        throw new Error(`There's no User with userName ${contact.userName}`);

      const user = userQuerySnapshot.docs[0].data();

      const newContact = {
        ...contact,
        id: user.id,
        createdAt: new Date(),
        userImage: "", // Need to generate an image to this
      };

      const contactResponse = await contactsRef.add(newContact);

      await contactResponse.update({ contactId: contactResponse.id });

      return { ...newContact, contactId: contactResponse.id };
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function deleteContact(params: {
    contactId: string;
    virtualAppId: string;
  }) {
    let { contactId, virtualAppId } = params;
    try {
      const contactsRef = firestore
        .doc(`clients/${virtualAppId}`)
        .collection("contacts")
        .doc(contactId);

      if (!contactsRef) throw new Error(`Contact not found`);

      const res = await contactsRef.delete();

      if (!res) throw new Error(`Error`);

      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function deleteMultipleContacts(params: {
    contactIds: string[];
    virtualAppId: string;
  }): Promise<void> {
    let { contactIds, virtualAppId } = params;
    try {
      const contactsCollection = firestore
        .doc(`clients/${virtualAppId}`)
        .collection("contacts");

      contactIds.forEach(async (id) => {
        const contactsRef = contactsCollection.doc(id);

        if (!contactsRef) throw new Error(`Contact not found`);

        const res = await contactsRef.delete();

        if (!res) throw new Error(`Error`);
      });
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function updateContact(params: {
    contactId: string;
    virtualAppId: string;
    updateFields: NexusGenInputs["CreateContactInput"];
  }) {
    let { contactId, virtualAppId } = params;
    try {
      const contactsRef = firestore
        .doc(`clients/${virtualAppId}`)
        .collection("contacts")
        .doc(contactId);

      if (!contactsRef) throw new Error(`Contact not found`);

      await contactsRef.update({ ...params.updateFields });

      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  return {
    getByVirtualAppId,
    findOne,
    createContact,
    deleteContact,
    deleteMultipleContacts,
    updateContact,
    addContact,
  };
}
