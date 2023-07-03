import axios from "axios";
import * as FirebaseAuthObject from "firebase/auth/dist/auth/index";
const Configs = require("../../config.json");

const BASE_URL = `https://maps.googleapis.com/maps/api/place`;

export type FirebaseAuth = typeof FirebaseAuthObject;

export function initPlacesController(params: {
  firestore: FirebaseFirestore.Firestore;
}) {
  const { firestore } = params;

  async function getPlacesAutocompleteOptions(params: {
    input: string;
  }): Promise<any> {
    let { input } = params;
    try {
      const placesResponse = await axios.get(
        `${BASE_URL}/autocomplete/json?input=${input}&types=address&key=${Configs.PLACES_API_KEY}`
      );
      const placesData = placesResponse.data;
      const predictions: Array<google.maps.places.AutocompletePrediction> =
        placesData.predictions;

      const autocompleteOptions = predictions.map((prediction) => ({
        label: prediction.description,
        value: prediction.place_id,
      }));

      return autocompleteOptions;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function getPlaceDetails(params: { place_id: string }): Promise<any> {
    let { place_id } = params;
    try {
      const placesDetailsResponse = await axios.get(
        `${BASE_URL}/details/json?place_id=${place_id}&key=${Configs.PLACES_API_KEY}`
      );
      //fetching data from google places api
      const placesDetailsData = placesDetailsResponse.data;
      const placeDetails: google.maps.places.PlaceResult =
        placesDetailsData.result;

      const userCity = placeDetails.address_components?.find(
        (component: any) => {
          if (component.types.includes("administrative_area_level_2"))
            return component;
        }
      )?.long_name;
      const userCountry = placeDetails.address_components?.find(
        (component: any) => {
          if (component.types.includes("country")) return component;
        }
      )?.long_name;
      const userState = placeDetails.address_components?.find(
        (component: any) => {
          if (component.types.includes("administrative_area_level_1"))
            return component;
        }
      )?.long_name;
      const userZipCode = placeDetails.address_components?.find(
        (component: any) => {
          if (component.types.includes("postal_code")) return component;
        }
      )?.long_name;

      let addressObj = {
        userAddress: placeDetails.formatted_address
          ? placeDetails.formatted_address
          : "",
        userCity: userCity ? userCity : "",
        userCountry: userCountry ? userCountry : "",
        userState: userState ? userState : "",
        userZipCode: userZipCode ? userZipCode : "",
      };

      return addressObj;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  return { getPlacesAutocompleteOptions, getPlaceDetails };
}
