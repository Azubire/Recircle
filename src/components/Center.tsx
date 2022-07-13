import { View } from "react-native";
import React, { ReactNode } from "react";

const Center: React.FC<ReactNode> = ({ children }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {children}
    </View>
  );
};

export default Center;
