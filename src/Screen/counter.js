import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const CounterRnative = ({ navigation }) => {
  const [counter, setCounter] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const fetchedUsers = [];
        querySnapshot.forEach((doc) => {
          fetchedUsers.push({ id: doc.id, ...doc.data() });
        });
        setUsers(fetchedUsers);
        // });
        // Do something with categoriesData, such as updating state or rendering it in your UI
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    // Call fetchData to retrieve data
    fetchData();
  }, []);

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("name");
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        data={users}
        horizontal
        renderItem={({ item }) => (
          <View>
            <Text>{item?.FirstName}</Text>
            <Image
              style={styles.image}
              source={{
                uri: item?.Picture,
              }}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} // You need to specify a unique key for each item
      />
      <Text style={styles.heading}>Welcome to our counter</Text>
      <Text style={styles.result}>{counter}</Text>
      <TouchableOpacity
        style={styles.TouchableOpacity}
        onPress={() => {
          setCounter(counter + 10);
        }}
      >
        <Text style={styles.text}>+10</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.TouchableOpacity}
        onPress={() => {
          setCounter(0);
        }}
      >
        <Text style={styles.text}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.TouchableOpacity}
        onPress={() => {
          if (counter > 0) {
            return setCounter(counter - 10);
          }
        }}
      >
        <Text style={styles.text}>-10</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Logout}
        onPress={() => {
          removeData();
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
  },
  heading: {
    fontSize: 25,
    color: "blue",
    fontWeight: "900",
    marginVertical: 28,
  },
  image: {
    width: 350,
    height: 200,
    resizeMode: "cover",
    borderRadius: 150,
    margin: 10,
  },
  TouchableOpacity: {
    height: 60,
    width: 180,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 20,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  result: {
    marginBottom: 30,
    fontSize: 35,
    fontWeight: "900",
    color: "white",
  },
  Logout: {
    height: 30,
    width: 90,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 12,
  },
  logoutText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
});

export default CounterRnative;
