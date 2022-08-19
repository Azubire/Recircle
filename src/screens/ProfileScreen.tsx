import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Center from "../components/Center";
import { Button, Text, TextInput, Title, useTheme } from "react-native-paper";
import CustomStatusbar from "../components/CustomStatusbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getUser, stateProps } from "../store/features/AuthSlice";
import { useAppSelector } from "../hooks/reduxhooks";
import { TabScreenProps } from "../navigations/appTabs/types";

const coverImg = require("../../assets/images/cover.jpeg");
const profileImg = require("../../assets/images/profile.jpeg");

const Profile = ({ navigation }: TabScreenProps<"Profile">) => {
  const [user, setUser] = React.useState<stateProps>();
  const [loading, setLoading] = React.useState(true);

  const { user: response } = useAppSelector(getUser);

  React.useEffect(() => {
    setUser({ user: response });
    setLoading(false);
  }, [response]);
  console.log(user);

  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomStatusbar style="light" backgroundColor={colors.gray} />
      {loading ? (
        <ActivityIndicator />
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
              <Image
                // @ts-ignore
                source={user?.user.profile.coverImg}
                resizeMode="cover"
                style={{ width: "100%", height: 150 }}
              />
              <View style={{ marginTop: -50 }}>
                <Image
                  // @ts-ignore
                  source={user?.user.profile.profileImg}
                  resizeMode="cover"
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 100,
                  }}
                />
                <TouchableOpacity>
                  <Ionicons
                    name="camera"
                    size={28}
                    color={colors.light}
                    style={{ position: "absolute", right: 0, bottom: 10 }}
                  />
                </TouchableOpacity>
              </View>
              <Text
                variant="bodyLarge"
                style={{ marginTop: 8, paddingBottom: 6 }}
              >
                {user?.user.profile.userName}
              </Text>
            </View>

            <View style={{ paddingHorizontal: 16 }}>
              <Text>
                Click below to become a recycler and set up your profile
              </Text>
              <Button
                onPress={() => {
                  navigation.navigate("BecomeRecycler");
                }}
                mode="outlined"
                textColor={colors.danger}
                style={{ alignSelf: "center", borderColor: colors.danger }}
              >
                Become A Recycler
              </Button>
            </View>

            <View style={{ paddingHorizontal: 6 }}>
              <Text
                variant="bodyLarge"
                style={{ marginTop: 16, textAlign: "center" }}
              >
                Change your details below
              </Text>
              <View style={{ marginVertical: 16 }}>
                <Text variant="labelLarge" style={{ marginBottom: 3 }}>
                  Username
                </Text>
                <TextInput
                  editable={false}
                  mode="outlined"
                  value={user?.user.profile.userName}
                  left={<TextInput.Icon name="account-cog-outline" />}
                  right={<TextInput.Icon name="pencil-outline" size={20} />}
                />
              </View>

              <View style={{ marginBottom: 16 }}>
                <Text variant="labelLarge" style={{ marginBottom: 3 }}>
                  Email Address
                </Text>
                <TextInput
                  mode="outlined"
                  value={user?.user.profile.email}
                  left={<TextInput.Icon name="email-edit-outline" />}
                  right={<TextInput.Icon name="pencil-outline" size={20} />}
                />
              </View>

              <View style={{ marginBottom: 16 }}>
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
              </View>
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
            >
              Save Changes
            </Button>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Profile;
