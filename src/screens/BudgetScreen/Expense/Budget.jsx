import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CategoryList from "../CategoryList";
import CategoryChart from "../CategoryChart";

import { Image } from "expo-image";
const Budget = () => {
  const [viewMode, setViewMode] = React.useState("list");
  return (
    <View className="bg-[#D7D9E8] h-full w-full dark:bg-neutral-900  ">
      <SafeAreaView className="mt-24">
        <View>
          <View className="flex flex-row justify-between pb-4">
            <Text className=" ml-4 font-bold text-2xl dark:text-white">
              {" "}
              My Expenses Tracking
            </Text>
          </View>

          <View className="bg-white rounded-t-3xl  mt-3 pt-10 border-black dark:bg-neutral-800">
            <View>
              {/* for category and chart */}

              <View className="mt-3 pl-4 ">
                <View className="flex flex-row justify-between">
                  <View>
                    <Text className="font-bold dark:text-white">
                      Total Trip
                    </Text>
                  </View>

                  <View className="pr-4 flex-row">
                    {/* chart icon         */}

                    <TouchableOpacity
                      className="mb-2"
                      style={{
                        backgroundColor: viewMode == "chart" ? "red" : null,
                        borderRadius: 25,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 25,
                        height: 30,
                        width: 30,
                      }}
                      onPress={() => setViewMode("chart")}
                    >
                      <Image
                        source={require("../../../../assets/images/icons/chart_icon.png")}
                        style={{
                          width: 18,
                          height: 15,
                          borderRadius: 2,
                          tintColor:
                            viewMode == "chart" ? Colors.white : "#2B3384",
                        }}
                      />
                    </TouchableOpacity>
                    {/* menu icon */}

                    <TouchableOpacity
                      className="mb-4 "
                      style={{
                        backgroundColor: viewMode == "list" ? "red" : null,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 25,
                        height: 30,
                        width: 28,
                      }}
                      onPress={() => setViewMode("list")}
                    >
                      <Image
                        source={require("../../../../assets/images/icons/menu_icon.png")}
                        style={{
                          width: 18,
                          height: 15,
                          paddingRight: 5,

                          tintColor:
                            viewMode == "list" ? Colors.white : "#2B3384",
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* scroll View  for list  */}
                <View>
                  <View
                    style={{ borderBottomColor: "black", borderBottomWidth: 1 }}
                  ></View>
                  {viewMode == "list" && <View>{<CategoryList />}</View>}
                  {viewMode == "chart" && <View>{<CategoryChart />}</View>}
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Budget;
