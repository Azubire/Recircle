import React from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon } from "native-base";

type iconProps = {
  name: string;
  isFocused: boolean;
};
const RenderIcon: React.FC<iconProps> = ({ name, isFocused }) => {
  let renderItem;

  if (name == "Lets Recycle") {
    renderItem = (
      <Icon
        mb="1"
        as={
          <MaterialCommunityIcons name={isFocused ? "home" : "home-outline"} />
        }
        color="white"
        size="lg"
      />
    );
  } else if (name == "Settings") {
    renderItem = (
      <Icon
        mb="1"
        as={<MaterialIcons name="settings" />}
        color="white"
        size="lg"
      />
    );
  }

  return <>{renderItem}</>;
};
export default RenderIcon;
