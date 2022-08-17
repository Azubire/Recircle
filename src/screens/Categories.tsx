import {
  View,
  FlatList,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { HomeStackScreenProps } from "../navigations/AppStack/types";
import {
  getAllCategory,
  RecyclingCategoryTypes,
} from "../store/features/RecyclingCategorySlice";
import { useAppSelector } from "../hooks/reduxhooks";

const Categories = ({ navigation }: HomeStackScreenProps<"Categories">) => {
  const [categories, setCategories] =
    React.useState<RecyclingCategoryTypes[]>();
  const [loading, setLoading] = React.useState(true);

  const { colors } = useTheme();

  const response = useAppSelector(getAllCategory);

  React.useEffect(() => {
    setCategories(response);
    setLoading(false);
  }, [response]);

  return (
    <>
      <StatusBar style="light" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                paddingHorizontal: 6,
                marginBottom: 16,
                marginTop: 24,
              }}
            >
              <Card style={{ backgroundColor: colors.light }}>
                <Card.Title
                  titleStyle={{ marginTop: 12 }}
                  titleVariant="bodySmall"
                  title="Let's Recycle With Recycle"
                  subtitleStyle={{
                    marginBottom: 24,
                  }}
                  subtitleNumberOfLines={4}
                  subtitleVariant="bodyLarge"
                  subtitle="Select from the categories below to start uploading your material"
                />
                <Image
                  source={require("../../assets/images/boy.png")}
                  resizeMode="contain"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    height: "100%",
                    zIndex: -1,
                  }}
                />

                <Card.Content>
                  <Text variant="bodyLarge" style={{ color: colors.info }}>
                    It's easy to get started
                  </Text>
                </Card.Content>
              </Card>
            </View>
          );
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Drawer", {
                screen: "Dashboard",
                params: { screen: "Sell", params: { id: item.id } },
              });
            }}
            style={{
              flex: 1,
              justifyContent: "center",
              margin: 6,
            }}
          >
            <Card style={{ backgroundColor: colors.light }}>
              <Card.Cover
                resizeMode="contain"
                source={item.icon}
                style={{
                  paddingTop: 10,
                  // borderWidth: 1,
                  alignSelf: "center",
                  height: 100,
                  width: 100,
                  backgroundColor: colors.light,
                }}
              />
              <Card.Content>
                <Text
                  variant="titleMedium"
                  style={{ textAlign: "center", marginVertical: 16 }}
                >
                  {item.title}
                </Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default Categories;
