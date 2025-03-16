import React, { useEffect } from 'react';
import { 
  View, Text, StyleSheet, Alert, BackHandler, TextInput, TouchableOpacity, Image, ScrollView, Dimensions 
} from 'react-native';
import { auth } from '../firebase';
import { Ionicons, Feather } from '@expo/vector-icons';

// Get screen dimensions for responsiveness
const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const handleLogout = async () => {
    try {
      Alert.alert('Logout', 'Are you sure you want to logout?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: async () => await auth.signOut() },
      ]);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Handle Back Button Press for Exit Confirmation
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Exit App",
        "Are you sure you want to exit?",
        [
          { text: "Cancel", onPress: () => null, style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() }
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.headerText}>
          Your <Text style={{ color: 'green' }}>Pocket</Text>-Friendly Food Ordering
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="person-circle-outline" size={32} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search & Filter */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="sliders" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Category Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
        <TouchableOpacity style={styles.categoryButton}><Text>All</Text></TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}><Text>Pizza</Text></TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}><Text>Burger</Text></TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}><Text>Drinks</Text></TouchableOpacity>
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <Text style={styles.promoText}>Discount Up To 50% For The Combo Pack</Text>
        </View>

        {/* Food Offers */}
        <Text style={styles.sectionTitle}>Popular Offers</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.foodList}>
          <View style={styles.foodCard}>
            <Image source={require('../assets/foods/burger.png')} style={styles.foodImage} />
            <Text style={styles.foodText}>Burger Combo - 30% Off</Text>
          </View>
          <View style={styles.foodCard}>
            <Image source={require('../assets/foods/pizza.png')} style={styles.foodImage} />
            <Text style={styles.foodText}>Pizza Meal - 25% Off</Text>
          </View>
        </ScrollView>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity><Ionicons name="home" size={24} color="green" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="cart" size={24} color="gray" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="heart" size={24} color="gray" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="person" size={24} color="gray" /></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 50 
  },
  headerText: { fontSize: width * 0.05, fontWeight: 'bold' },
  searchContainer: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 10 },
  searchInput: { 
    flex: 1, 
    backgroundColor: '#f0f0f0', 
    borderRadius: 10, 
    padding: 10, 
    fontSize: width * 0.04, 
    marginRight: 8 
  },
  filterButton: { backgroundColor: 'green', padding: 10, borderRadius: 10 },
  
  categories: { 
    flexDirection: 'row', 
    alignItems: 'center',  // Prevents stretching 
    paddingHorizontal: 20, 
    paddingVertical: 5, 
    maxHeight: 50 // Ensures it doesn’t take full height
  },
  categoryButton: { 
    backgroundColor: '#f0f0f0', 
    paddingVertical: 8,  // Increased padding for better touch 
    paddingHorizontal: 12, 
    borderRadius: 10, 
    marginRight: 8 
  },
  
  promoBanner: { 
    backgroundColor: '#d4edda', 
    padding: 20, 
    marginHorizontal: 16, 
    marginBottom: 10, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  promoText: { fontSize: width * 0.045, fontWeight: 'bold', color: 'green', textAlign: 'center' },
  sectionTitle: { fontSize: width * 0.05, fontWeight: 'bold', marginHorizontal: 16, marginVertical: 10 },
  foodList: { paddingHorizontal: 16 },
  foodCard: { 
    width: width * 0.4, 
    marginRight: 10, 
    alignItems: 'center', 
    backgroundColor: '#f9f9f9', 
    padding: 10, 
    borderRadius: 10 
  },
  foodImage: { width: width * 0.3, height: width * 0.3, borderRadius: 10, resizeMode: 'contain' },
  foodText: { fontSize: width * 0.035, textAlign: 'center', marginTop: 5 },
  bottomNav: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingVertical: 12, 
    borderTopWidth: 1, 
    borderTopColor: '#ddd' 
  },
});

export default HomeScreen;
