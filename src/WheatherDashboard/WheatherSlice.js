import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const LATITUDE_LONGITUDE_APU_URL = "http://api.positionstack.com/v1/forward";
const SECRET_ACCESS_KEY = "f09cbfc40ff62f41ae2916ad41a7c46a";

const WHEATHER_DATA_API = "https://api.open-meteo.com/v1/forecast";

export const getLattitudeAndLongitude = createAsyncThunk(
  "wheather/getLattitudeAndLongitude",
  async (data, { failedWithMessage }) => {
    try {
      const response = axios.get(
        `${LATITUDE_LONGITUDE_APU_URL}?access_key=${SECRET_ACCESS_KEY}&query=${data}`
      );
      if (Array.isArray(response) && response.length > 0) {
        const { latitude, longitude } = response[0] || {};
        if (latitude && longitude) {
          const wheatherData = getWheatherData({ latitude, longitude });
        }
      } else {
        return failedWithMessage("Unable to fetch wheather data!");
      }
    } catch (ex) {
      return failedWithMessage("Unable to fetch wheather data!");
    }
  }
);

export const getWheatherData = createAsyncThunk(
  "wheather/getWheatherData",
  async (data, { failedWithMessage }) => {
    try {
      const { latitude, longitude } = data;
      const response = axios.get(
        `${WHEATHER_DATA_API}?latitude=${latitude}&longitude=${longitude}`
      );
      return response;
    } catch (ex) {
      return {};
    }
  }
);

const WheatherSlice = createSlice({
  name: "wheather",
  initialState: {
    data: {},
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLattitudeAndLongitude.pending, (state) => {
        (state.loading = true), (state.error = "");
      })
      .addCase(getLattitudeAndLongitude.fulfilled, (state, action) => {
        (state.loading = false), (state.data = action.payload);
      })
      .addCase(getLattitudeAndLongitude.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});
