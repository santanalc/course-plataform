import DataLoader from "dataloader";
import { NexusGenRootTypes } from "../generated/nexus-typegen";
import { ControllersType } from "../index";

interface DataLoaderUtils {
  controllers: ControllersType;
}
export function initDataLoaders({ controllers }: DataLoaderUtils) {
  const user = new DataLoader<string, NexusGenRootTypes["UserType"]>(
    async (userUids) => {
      return Promise.all(
        userUids.map(async (userUid) => {
          let user = await controllers.user.findOne(userUid);

          return user || new Error(`There's no user with uid ${userUid}`);
        })
      );
    }
  );

  const virtualApp = new DataLoader<
    string,
    NexusGenRootTypes["VirtualAppType"]
  >(async (virtualAppIds) => {
    return Promise.all(
      virtualAppIds.map(async (virtualAppId) => {
        let virtualApp = await controllers.virtualApp.findOne(virtualAppId);

        return (
          virtualApp ||
          new Error(`There's no virtualApp with id ${virtualAppId}`)
        );
      })
    );
  });

  return { user, virtualApp };
}
