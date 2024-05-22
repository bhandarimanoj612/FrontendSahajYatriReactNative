import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const All = () => {
  const sortData = ["All"];
  //   making bottom look good
  const [activeAll, setActive] = useState("All");
  return (
    <View
      style={style.Shadow}
      className="m-10 shadow-black shadow-lg flex-row bg-red justify-around items-center mx-4 p-2 rounded-2xl bg-[#EAE7E7]"
    >
      {sortData.map((sort, index) => {
        /* checking condition to check weather the active toggle is good or not  */
        let isActive = sort == activeAll;
        let activeButton = isActive ? "bg-white shadow " : "";
        return (
          <TouchableOpacity
            onPress={() => setActive(sort)}
            key={index}
            className={`p-3 flex rounded-full  px-4 ${activeButton} shadow-inner shadow-black`}
          >
            <Text
              className="font-semibold"
              style={{ fontSize: wp(4), color: isActive ? "red" : "black" }}
            >
              {sort}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const style = StyleSheet.create({
  Shadow: {
    borderColor: "#D8D5D5",
    borderWidth: 2,
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 1,
    overflow: "visible",
    shadowOffset: { width: 1, height: 6 },
  },
});

export default All;
