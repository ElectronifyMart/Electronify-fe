import { apiClient } from "@/services/apiClient";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("counter", () => {
  const router = useRouter();

  const tokenUser = ref(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );
  const currentUser = ref(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const profilePicture = ref(
    localStorage.getItem("profile")
      ? JSON.parse(localStorage.getItem("profile"))
      : null
  );

  const LoginUser = async (inputData) => {
    try {
      const { email, password } = inputData;

      const { data } = await apiClient.post("/auth/login", {
        email,
        password,
      });

      tokenUser.value = data.token;
      currentUser.value = data.user;

      localStorage.setItem("token", JSON.stringify(tokenUser.value));
      localStorage.setItem("user", JSON.stringify(currentUser.value));
      return data;
    } catch (error) {
      throw error;
    }
  };

  const RegisterUser = async (inputData) => {
    try {
      const { name, email, password, password_confirmation } = inputData;
      console.log(name, email, password, password_confirmation);

      const { data } = await apiClient.post("/auth/register", {
        name,
        email,
        password,
        password_confirmation,
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAccount = async () => {
    try {
      const { response } = await apiClient.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${tokenUser.value}`,
        },
      });
      const { user } = response;
      localStorage.setItem("user", JSON.stringify(user));
      currentUser.value = user;
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const verifikasiAccount = async (otp) => {
    try {
      const { data } = await apiClient.post(
        "/auth/verified",
        { otp },
        {
          headers: {
            Authorization: `Bearer ${tokenUser.value}`,
          },
        }
      );
      getAccount();
      console.log(data);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const generateOtpCode = async (email) => {
    try {
      await apiClient.post(
        "/auth/otp",
        { email },
        {
          headers: {
            Authorization: `Bearer ${tokenUser.value}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const LogoutUser = async () => {
    try {
      await apiClient.post("/logout", "", {
        headers: {
          Authorization: `Bearer ${tokenUser.value}`,
        },
      });

      tokenUser.value = null;
      currentUser.value = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("profile");
    } catch (error) {}
  };

  const profileUser = async (inputData) => {
    console.log(tokenUser.value);
    try {
      const response = await apiClient.post("/profile", inputData, {
        headers: {
          Authorization: `Bearer ${tokenUser.value}`,
        },
      });

      const profileData = response.data.data;
      localStorage.setItem("profile", JSON.stringify(profileData));
      profilePicture.value = profileData.image || null;
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    LoginUser,
    RegisterUser,
    tokenUser,
    generateOtpCode,
    getAccount,
    verifikasiAccount,
    currentUser,
    LogoutUser,
    profileUser,
    profilePicture,
  };
});
