import { ActivityIndicator, FlatList, Image, View } from "react-native";
import React from "react";
import { AppDrawerScreenProps } from "../navigations/AppDrawer/Types";
import CustomStatusbar from "../components/CustomStatusbar";
import {
  Button,
  Card,
  Paragraph,
  Text,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { adFilterTypes, getAd, getAllAds } from "../store/features/AdSlice";
import dateFormat from "dateformat";
import {
  getUserAds,
  getUserAdsState,
  UserAds,
} from "../store/features/UserAds";
import { getUser } from "../store/features/AuthSlice";

const History = ({ navigation }: AppDrawerScreenProps<"History">) => {
  const [filterItems, setFilterItems] = React.useState<
    {
      id: string;
      title: string;
      status: "pending" | "complete" | "rejected";
      description: string;
      adImage: string;
      createdAt: string;
    }[]
  >();
  const [loading, setLoading] = React.useState(true);
  const [selectedValue, setSelectedValue] = React.useState<number>(1);
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const filterOptions = [
    { label: "All", value: 1 },
    { label: "Completed", value: 2 },
    { label: "Pending", value: 3 },
    { label: "Rejected", value: 4 },
  ];

  const state = useAppSelector(getUserAdsState);
  const { user } = useAppSelector(getUser);

  const handleValueChange = (value: number) => {
    setLoading(true);
    let newFilterItems;
    switch (value) {
      case 2:
        newFilterItems = state.data.user?.filter(
          (item) => item.status == "complete"
        );
        setSelectedValue(2);
        break;
      case 3:
        newFilterItems = state.data.user?.filter(
          (item) => item.status == "pending"
        );
        setSelectedValue(3);
        break;
      case 4:
        newFilterItems = state.data.user?.filter(
          (item) => item.status == "rejected"
        );
        setSelectedValue(4);
        break;

      default:
        newFilterItems = state.data.user;
        setSelectedValue(1);
        break;
    }

    setFilterItems(newFilterItems);
    setLoading(false);
  };

  const getData = async () => {
    console.log("first", state.status);
    try {
      const data = await dispatch(
        getUserAds(user.userToken.toString())
      ).unwrap();
      console.log(data);
      setSelectedValue(1);
      setFilterItems(state.data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <CustomStatusbar style="light" />

      <View
        style={{
          marginVertical: 16,
          marginHorizontal: 6,
        }}
      >
        <Title>Filter</Title>
        <TextInput
          mode="outlined"
          render={() => (
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => handleValueChange(itemValue)}
            >
              {filterOptions.map((item) => (
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          )}
        />
      </View>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={filterItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1, margin: 6 }}>
              <Card mode="contained">
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Title style={{ flex: 0.4, paddingLeft: 8 }}>{item.id}</Title>
                  <Image
                    source={{
                      uri: `http://192.168.43.35:3001/images/ads/${item.adImage}`,
                    }}
                    style={{ height: 60, width: 70, flex: 0.7 }}
                    resizeMode="cover"
                  />
                  <View style={{ flex: 3 }}>
                    <Card.Title
                      title={item.title}
                      subtitle={dateFormat(item.createdAt, "fullDate")}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1.3,
                    }}
                  >
                    <Button
                      textColor={
                        item.status == "complete"
                          ? colors.success
                          : item.status == "pending"
                          ? colors.info
                          : colors.danger
                      }
                    >
                      {item.status}
                    </Button>
                  </View>
                </View>
              </Card>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={{ marginVertical: 8 }}></View>
          )}
        />
      )}
    </View>
  );
};

export default History;
