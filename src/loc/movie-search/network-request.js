import { HttpErrors } from "../../errors/httpe";
import openNotificationWithIcon from "../../hoc/alert";
import makeGET from "../../http/request";

export function fetchMovieNames(searchString = "") {
  const apiKey = process.env.REACT_APP_OMDB_KEY;
  const omdbURL = process.env.REACT_APP_OMDB_URL;

  if (searchString) {
    if (!apiKey || !omdbURL)
      return Promise.reject(HttpErrors.API_KEY_END_POINT_EMPTY);
    const queryObject = {
      s: searchString,
      apikey: apiKey,
    };

    return makeGET(omdbURL, queryObject).then((response) => {
      const { Response } = response;
      if (Response === "True") {
        return {
          movies: response["Search"].filter(item => item["Type"] == "movie"),
          message: "",
        };
      } else {
        openNotificationWithIcon("error", "API Error: " + response["Error"] || "No movies found");
        return {
          movies: [],
          message: response["Error"] || "No movies found",
        };
      }
    });
  }
  return Promise.reject(HttpErrors.SEARCH_CANNOT_BE_EMPTY);
}
