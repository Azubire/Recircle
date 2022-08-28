import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { TabScreenProps } from "../navigations/appTabs/types";
import { Button, Searchbar, Title, useTheme } from "react-native-paper";
import CustomStatusbar from "../components/CustomStatusbar";
import { useAppSelector } from "../hooks/reduxhooks";
import {
  getSearchResults,
  initialStateTypes,
} from "../store/features/RecyclerSclice";
import { StatusBar } from "expo-status-bar";

const Search = ({ navigation }: TabScreenProps<"Search">) => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [error, setError] = React.useState(false);
  const [results, setResults] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState<initialStateTypes>();

  const { colors } = useTheme();

  const handleSubmit = () => {
    setLoading(true);
    const query = searchQuery.trim().toLowerCase();
    setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 2000);
  };

  return (
    <ScrollView>
      <StatusBar style="light" />
      <Title style={{ textAlign: "center", marginVertical: 16 }}>
        Search below for a recycler near you
      </Title>
      <View style={{ marginHorizontal: 16 }}>
        <Searchbar
          placeholder="type here to search..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View
        style={{
          marginTop: 16,
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator />
        ) : error ? (
          <Text style={{ color: colors.error }}>No Search Results Found !</Text>
        ) : results ? (
          <Text style={{ color: colors.success }}>1 Result(s) Found !</Text>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default Search;
