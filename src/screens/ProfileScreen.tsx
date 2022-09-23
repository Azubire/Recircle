import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import CustomStatusbar from "../components/CustomStatusbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  getUser,
  removeUser,
  updateProfileImage,
} from "../store/features/AuthSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { TabScreenProps } from "../navigations/appTabs/types";
import axios from "axios";
import * as secureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { baseUrl } from "../utils/helpers";

const Profile = ({ navigation, route }: TabScreenProps<"Profile">) => {
  const [user, setUser] = React.useState<{
    profile: {
      userName: string;
      email: string;
      coverImg: ImageSourcePropType | undefined;
      profileImg: ImageSourcePropType | undefined;
    };
  }>();
  const [recyclerStatus, setRecyclerStatus] = React.useState({
    isRecycler: false,
    isVerified: false,
  });

  const [image, setImage] = React.useState<any>();
  const [loading, setLoading] = React.useState(true);

  const state = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  const getRecyclerStatus = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/recycler/status/${state.user.profile.id}`
      );
      if (data.data.Recycler) {
        if (data.data.Recycler.isVerified) {
          setRecyclerStatus({ isRecycler: true, isVerified: true });
        } else {
          setRecyclerStatus({ isRecycler: true, isVerified: false });
        }
      } else {
        setRecyclerStatus({ isRecycler: false, isVerified: false });
      }
    } catch (error) {
      setRecyclerStatus({ isRecycler: false, isVerified: false });
    }
  };

  React.useEffect(() => {
    setUser((prev) => ({
      profile: {
        userName: state.user.profile.userName,
        email: state.user.profile.email,
        coverImg: state.user.profile.coverImg,
        profileImg: state.user.profile.profileImg,
      },
    }));
    setLoading(false);
  }, [state.user.profile]);
  console.log("sgdhag");

  React.useEffect(() => {
    getRecyclerStatus();
  }, [route.params?.refresh]);
  const { colors } = useTheme();

  const handleLogOut = async () => {
    try {
      await secureStore.deleteItemAsync("USERTOKEN");

      dispatch(removeUser());
      // console.log("user token deleted");
    } catch (error) {
      // console.log("error deleteing user token");
    }
  };

  const createFormData = (image: any) => {
    const newImg = {
      uri: image.uri,
      name: image.uri.split("/").pop(),
      type: mime.getType(image.uri),
    };
    const data = new FormData();
    //@ts-ignore
    data.append("profileImage", newImg);

    return data;
  };

  const uploadImage = async () => {
    try {
      const formData = createFormData(image);
      const newData = { id: state.user.profile.id, image: formData };
      const data = await dispatch(updateProfileImage(newData)).unwrap();
      // console.log("datha", data);
      setImage(undefined);
    } catch (error) {
      // console.log("error", error);
      setImage(undefined);
    }
  };

  const pickImage = async () => {
    // setImage(undefined);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result);
    if (!result.cancelled) {
      setImage(result);
    }
  };

  return (
    <>
      <CustomStatusbar
        style="light"
        // backgroundColor={colors.gray}
        translucent={true}
      />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView>
          <View style={{ flex: 1 }}>
            {/* header  */}
            <View
              style={{
                // backgroundColor: colors.gray,
                alignItems: "center",
              }}
            >
              {user?.profile.coverImg ? (
                <Image
                  source={{
                    uri: `${baseUrl}/images/categoryImages/${user?.profile.coverImg}`,
                  }}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: 200,
                  }}
                />
              ) : (
                <Image
                  source={state.defaultImg.coverImg}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: 200,
                  }}
                />
              )}
              <View style={{ marginTop: -50 }}>
                {user?.profile.profileImg ? (
                  <Image
                    source={{
                      uri: `${baseUrl}/images/categoryImages/${user?.profile.profileImg}`,
                    }}
                    resizeMode="cover"
                    style={{
                      width: 110,
                      height: 110,
                      borderRadius: 100,
                    }}
                  />
                ) : (
                  <Image
                    source={state.defaultImg.profileImg}
                    resizeMode="cover"
                    style={{
                      width: 110,
                      height: 110,
                      borderRadius: 100,
                      borderWidth: 2,
                      borderColor: colors.info,
                    }}
                  />
                )}
                <TouchableOpacity onPress={pickImage}>
                  <Ionicons
                    name="camera"
                    size={40}
                    color={colors.info}
                    style={{ position: "absolute", right: -8, bottom: 0 }}
                  />
                </TouchableOpacity>
              </View>
              <Text
                variant="bodyLarge"
                style={{ marginTop: 8, paddingBottom: 6 }}
              >
                {image ? (
                  <Button mode="elevated" onPress={uploadImage}>
                    click to save image
                  </Button>
                ) : (
                  user?.profile.userName
                )}
              </Text>
            </View>
            <SafeAreaView>
              <View style={{ paddingHorizontal: 16 }}>
                {recyclerStatus?.isVerified ? (
                  <>
                    <Text style={{ textAlign: "center", marginBottom: 10 }}>
                      Recycler Status
                    </Text>
                    <Button
                      mode="outlined"
                      textColor={colors.success}
                      style={{
                        alignSelf: "center",
                        borderColor: colors.success,
                      }}
                    >
                      Verified
                    </Button>
                  </>
                ) : (
                  <>
                    <Text style={{ textAlign: "center", marginBottom: 10 }}>
                      Click below to become a recycler and set up your profile
                    </Text>
                    <Button
                      onPress={() => {
                        navigation.push("BecomeRecycler");
                      }}
                      mode="outlined"
                      textColor={colors.danger}
                      style={{
                        alignSelf: "center",
                        borderColor: colors.danger,
                      }}
                    >
                      Register As Recycler
                    </Button>
                  </>
                )}
              </View>

              <View style={{ paddingHorizontal: 6 }}>
                <Text
                  variant="bodyLarge"
                  style={{ marginTop: 16, textAlign: "center" }}
                >
                  View your details below
                </Text>
                <View style={{ marginVertical: 16 }}>
                  <Text variant="labelLarge" style={{ marginBottom: 3 }}>
                    Username
                  </Text>
                  <TextInput
                    editable={false}
                    mode="outlined"
                    value={user?.profile.userName}
                    left={<TextInput.Icon name="account-cog-outline" />}
                    // right={<TextInput.Icon name="pencil-outline" size={20} />}
                  />
                </View>

                <View style={{ marginBottom: 16 }}>
                  <Text variant="labelLarge" style={{ marginBottom: 3 }}>
                    Email Address
                  </Text>
                  <TextInput
                    mode="outlined"
                    value={user?.profile.email}
                    left={<TextInput.Icon name="email-edit-outline" />}
                    // right={<TextInput.Icon name="pencil-outline" size={20} />}
                  />
                </View>

                {/* <View style={{ marginBottom: 16 }}>
                  <Text variant="labelLarge" style={{ marginBottom: 3 }}>
                    Password
                  </Text>
                  <TextInput
                    secureTextEntry
                    mode="outlined"
                    value=""
                    left={<TextInput.Icon name="account-eye-outline" />}
                    right={<TextInput.Icon name="pencil-outline" size={20} />}
                  />
                </View> */}
              </View>

              <Button
                mode="outlined"
                buttonColor={colors.secondary}
                textColor={colors.lightText}
                style={{
                  alignSelf: "center",
                  marginVertical: 16,
                  borderColor: colors.secondary,
                }}
                onPress={handleLogOut}
              >
                Logout
              </Button>
            </SafeAreaView>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Profile;
