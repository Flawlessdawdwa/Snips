import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import HomePage from '@/screens/HomePage';
import FeedPage from '@/screens/FeedPage';
import RewardsPage from '@/screens/RewardsPage';
import ProfilePage from '@/screens/ProfilePage';
import HomeIcon from '@/assets/icons/Home.svg';
import FeedIcon from '@/assets/icons/Feed.svg';
import RewardsIcon from '@/assets/icons/Rewards.svg';
import ProfileIcon from '@/assets/icons/Profile.svg';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({
  focused,
  label,
}: {
  focused: boolean;
  label: string;
}) => {
  const getIcon = () => {
    switch (label) {
      case 'Home':
        return (
          <HomeIcon
            width={24}
            height={24}
            fill={focused ? 'rgba(254, 254, 254, 1)' : 'rgba(255, 255, 255, 0.6)'}
          />
        );
      case 'For you':
        return (
          <FeedIcon
            width={24}
            height={24}
            fill={focused ? 'rgba(254, 254, 254, 1)' : 'rgba(255, 255, 255, 0.6)'}
          />
        );
      case 'Rewards':
        return (
          <RewardsIcon
            width={24}
            height={24}
            fill={focused ? 'rgba(254, 254, 254, 1)' : 'rgba(255, 255, 255, 0.6)'}
          />
        );
      case 'Profile':
        return (
          <ProfileIcon
            width={24}
            height={24}
            fill={focused ? 'rgba(254, 254, 254, 1)' : 'rgba(255, 255, 255, 0.6)'}
          />
        );
      default:
        return (
          <HomeIcon
            width={24}
            height={24}
            fill={focused ? 'rgba(254, 254, 254, 1)' : 'rgba(255, 255, 255, 0.6)'}
          />
        );
    }
  };

  return (
    <View style={styles.tabIconContainer}>
      {getIcon()}
      <Text
        style={[styles.tabLabel, focused && styles.tabLabelFocused]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} label={route.name} />
          ),
          tabBarBackground: () => (
            <BlurView
              style={StyleSheet.absoluteFillObject}
              blurType={Platform.OS === 'ios' ? 'dark' : 'dark'}
              blurAmount={20}
              reducedTransparencyFallbackColor="#0E0E0E"
            />
          ),
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="For you" component={FeedPage} />
        <Tab.Screen name="Rewards" component={RewardsPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(20, 20, 20, 0.98)',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    elevation: 0,
    paddingTop: 8,
    paddingBottom: 25,
    height: 85,
    position: 'absolute',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    minWidth: 60,
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 0,
  },
  tabIconFocused: {
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '500',
    marginTop: 2,
    textAlign: 'center',
  },
  tabLabelFocused: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    fontSize: 10,
  },
});

export default AppNavigator;
