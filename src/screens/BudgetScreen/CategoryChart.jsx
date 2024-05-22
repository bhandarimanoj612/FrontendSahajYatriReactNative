//import liraries
import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { VictoryPie } from "victory-native";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../../Context/AuthContext";
import EmptyChart from "../../components/emptyChart";

//refernces for pie chart doc https://commerce.nearform.com/open-source/victory/docs/victory-pie
// create a component
const CategoryChart = () => {
  const { userInfo } = useContext(AuthContext);
  const [tripData, setTripData] = useState([]);
  // const [graphicData, setGraphicData] = useState(defaultGraphicData); //for making animation in vector pie
  const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }]; // Data used to make the animate prop work

  useEffect(() => {
    fetchTripData();
  }, []);

  const fetchTripData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}BudgetTrip/user/${userInfo.email}`
      );
      setTripData(response.data);
    } catch (error) {
      console.error("Error fetching trip data:", error);
    }
  };

  // Calculate chart data from trip data
  const chartData = tripData.map((trip) => ({
    x: trip.city,
    y: 20,
    // Set a default value for each trip
  }));

  // State for the selected category
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Sample size object
  const SIZES = {
    width: 470, // Adjust the width as needed
  };

  // Sample color scale
  const colorScales = [
    "#7DB9DE", // Sky Blue
    "#FECB52", // Yellow
    "#83D3C9", // Turquoise
    "#F58A5E", // Coral
    "#BFD7EA", // Light Blue
    "#F4C7AB", // Peach
    "#D2FFF7", // Light Cyan
    "#E4FFCF", // Pale Green
    "#FFD3D3", // Pale Pink
    "#EAD4FF", // Lavender
    "#A5FFD6", // Mint Green
    "#FFD700", // Gold
    "#FF7F50", // Salmon
    "#ADFF2F", // Green Yellow
    "#87CEEB", // Sky Blue
    "#FF69B4", // Hot Pink
    "#20B2AA", // Light Sea Green
    "#FFA07A", // Light Salmon
    "#00CED1", // Dark Turquoise
    "#FF6347", // Tomato
  ];

  const renderPieChart = () => {
    if (chartData.length === 0) {
      return (
        <View>
          <EmptyChart />
        </View>
      );
    } else {
      return (
        <View>
          <VictoryPie
            animate={{ duration: 4000, easing: "exp" }}
            data={chartData}
            labels={({ datum }) => `${datum.x}`} // for making the chart dunot shape
            radius={({ datum }) =>
              selectedCategory === datum.x
                ? SIZES.width * 0.4
                : SIZES.width * 0.4 - 10
            }
            innerRadius={70}
            labelRadius={(
              { innerRadius } //for adding radius to the chart
            ) => (SIZES.width * 0.4 + innerRadius) / 2.5}
            style={{
              labels: {
                fill: "black",
                fontSize: 12,
                fontStyle: "italic",
              },
              parent: {
                ...styles.shadow,
              },
            }}
            width={SIZES.width}
            height={SIZES.width}
            colorScale={colorScales}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onPress: () => {
                    return [
                      {
                        target: "labels",
                        mutation: (props) => {
                          const categoryName = chartData[props.index].x;
                          setSelectedCategory(categoryName);
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />
        </View>
      );
    }
  };
  return (
    <ScrollView className="dark:bg-neutral-800  mb-60">
      <View style={styles.container}>
        <View className="flex flex-row "></View>
        {/* date of the month with year  */}
        {/* horizontal line */}
        <View className=" m-4">
          {/* Render the pie chart conditionally */}
          {renderPieChart()}
        </View>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderEndEndRadius: 40,
  },
});

//make this component available to the app
export default CategoryChart;
