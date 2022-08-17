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
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../hooks/reduxhooks";
import { adFilterTypes, getAd, getAllAds } from "../store/features/AdSlice";

const History = ({ navigation }: AppDrawerScreenProps<"History">) => {
  const [filterItems, setFilterItems] = React.useState<adFilterTypes[]>();
  const [loading, setLoading] = React.useState(true);
  const [listId, setListId] = React.useState(1);
  const { colors } = useTheme();

  const filterOptions = [
    { label: "All", value: 1 },
    { label: "Completed", value: 2 },
    { label: "Pending", value: 3 },
    { label: "Rejected", value: 4 },
  ];

  const response = useAppSelector(getAllAds);
  // console.log(response);
  const handleValueChange = (value: number) => {
    setLoading(true);
    let newFilterItems;
    switch (value) {
      case 2:
        newFilterItems = response?.filter((item) => item.status == "Completed");
        setListId(2);
        break;
      case 3:
        newFilterItems = response?.filter((item) => item.status == "Pending");
        setListId(3);
        break;
      case 4:
        newFilterItems = response?.filter((item) => item.status == "Rejected");
        setListId(4);
        break;

      default:
        newFilterItems = response;
        setListId(1);
        break;
    }

    setFilterItems(newFilterItems);
    setLoading(false);
  };

  React.useEffect(() => {
    setFilterItems(response);
    setLoading(false);
  }, [response]);

  return (
    <View style={{ flex: 1 }}>
      <CustomStatusbar style="light" />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={filterItems}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => (
            <View
              style={{
                marginTop: 16,
                marginHorizontal: 6,
              }}
            >
              <Title>Filter</Title>
              <TextInput
                mode="outlined"
                // value={1}
                render={() => (
                  <RNPickerSelect
                    placeholder={{
                      label: "Select filter",
                      value: listId,
                    }}
                    onValueChange={(value) => handleValueChange(value)}
                    items={filterOptions}
                  />
                )}
              />
            </View>
          )}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1, margin: 6 }}>
              <Card mode="contained">
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Title style={{ flex: 0.5, paddingLeft: 8 }}>{item.id}</Title>
                  <Image
                    source={item.img}
                    style={{ height: 40, width: 40, flex: 0.5 }}
                    resizeMode="cover"
                  />
                  <View style={{ flex: 3 }}>
                    <Card.Title
                      title={item.title}
                      subtitle={`${item.date} | ${item.time}`}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1.5,
                    }}
                  >
                    <Button
                      textColor={
                        item.status == "Completed"
                          ? colors.success
                          : item.status == "Pending"
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
