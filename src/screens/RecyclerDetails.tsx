import { View, ScrollView, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { RecyclerStackScreenProps } from "../navigations/RecyclersStack/types";
import { ActivityIndicator, Button, Text, useTheme } from "react-native-paper";
import { string } from "joi";
import { FlatList } from "react-native-gesture-handler";

const img1 = require("../../assets/images/r1.jpg");
const img2 = require("../../assets/images/r2.jpg");
const img3 = require("../../assets/images/r3.jpg");

const results = [
  {
    id: 1,
    name: "Caressona Ldt",
    motto: "we are the best",
    profile:
      "We are focused on recycling waste products to bring out something meaningful to the environment. We are focused on recycling waste products to bring out something meaningful to the environment.      We are focused on recycling waste products to bring out something meaningful to the environment.We are focused on recycling waste products to bring out something meaningful to the environment.We are focused on recycling waste products to bring out something meaningful to the environment.We are focused on recycling waste products to bring out something meaningful to the environment.",
    img: img1,
    buyingCategory: ["Glass", "Platic", "Paper"],
    joinedDate: "3rd Jun 2022",
    workinghours: "6am - 6pm",
    workingDays: "Mon - Fri",
    location: "Accra Tema",
    verified: true,
    ratings: 122,
  },
  {
    id: 2,
    name: "My-Waist Recycle Ldt",
    motto: "Bring your material to us",
    profile:
      "We collect all kind of waste material from you no matter your location. Just make your offer.",
    img: img2,
    buyingCategory: ["Paper", "Iron & Wood", "Paper"],
    joinedDate: "3rd Jun 2022",
    workinghours: "8am - 4pm",
    workingDays: "Mon - Fri",
    location: "Kumasi Adom",
    verified: false,
    ratings: 122,
  },
  {
    id: 3,
    name: "North-Bridge Collector",
    motto: "we collect them all",
    profile:
      "We aim to protect and transform the world with our recycling methods. What is better than saung the world and making some money?.We aim to protect and transform the world with our recycling methods. What is better than saung the world and making some money?.We aim to protect ",
    img: img3,
    buyingCategory: ["Platicc", "Paper", "Iron & Wood", "Glass"],
    joinedDate: "3rd Jun 2022",
    workinghours: "7am - 5pm",
    workingDays: "Mon - Fri",
    location: "Bolgatanga Soe",
    verified: true,
    ratings: 122,
  },
  {
    id: 4,
    name: "North-Bridge Collector",
    motto: "we collect them all",
    profile:
      "We aim to protect and transform the world with our recycling methods. What is better than saung the world and making some money?.",
    img: img3,
    buyingCategory: [
      "Plastic",
      "Paper",
      "Platic",
      "Paper",
      "Iron & Wood",
      "Platic",
      "Paper",
    ],
    joinedDate: "3rd Jun 2022",
    workinghours: "7am - 5pm",
    workingDays: "Mon - Fri",
    location: "Bolgatanga Soe",
    verified: true,
    ratings: 122,
  },
];

const RecyclerDetails = ({
  route,
}: RecyclerStackScreenProps<"RecyclerDetails">) => {
  const [data, setData] = React.useState(results);
  const [recycler, setRecycler] = React.useState<{
    id: number;
    name: string;
    motto: string;
    profile: string;
    img: ImageSourcePropType;
    buyingCategory: string[];
    joinedDate: string;
    workinghours: string;
    workingDays: string;
    location: string;
    verified: boolean;
    ratings: number;
  } | null>();

  const { id } = route.params;
  const { colors } = useTheme();

  React.useEffect(() => {
    const results = data.find((item) => item.id === parseInt(id));
    setRecycler(results);
  }, [id, data]);

  return (
    <ScrollView>
      {recycler ? (
        <View>
          <View>
            <Image
              source={recycler.img}
              resizeMode="cover"
              style={{ width: "100%", height: 200 }}
            />
            <Text
              style={{
                marginTop: 10,
                marginHorizontal: 6,
                color: colors.danger,
              }}
            >
              What we buy
            </Text>
            <FlatList
              style={{ marginTop: 10 }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={recycler.buyingCategory}
              renderItem={({ item, index }) => (
                <Button
                  mode="contained-tonal"
                  style={{
                    marginHorizontal: 6,
                    borderRadius: 3,
                  }}
                >
                  {item}
                </Button>
              )}
            />
          </View>
          <View style={{ paddingHorizontal: 6 }}>
            {/* heading  */}
            <View>
              <Text variant="headlineLarge" style={{ marginTop: 16 }}>
                Our Profile
              </Text>
              <Text style={{ color: colors.primary }}>
                Joined: {recycler.joinedDate}
              </Text>
            </View>

            {/* profile  */}
            <View>
              <Text variant="bodyMedium" style={{ marginTop: 16 }}>
                {recycler.profile}
              </Text>
            </View>

            {/* cta button */}
            <Button
              mode="contained"
              // buttonColor={colors.secondary}
              style={{
                marginTop: 24,
                marginBottom: 16,
                width: "70%",
                alignSelf: "center",
              }}
            >
              Sell to us
            </Button>
          </View>
        </View>
      ) : (
        <ActivityIndicator style={{ marginTop: 16 }} />
      )}
    </ScrollView>
  );
};

export default RecyclerDetails;
