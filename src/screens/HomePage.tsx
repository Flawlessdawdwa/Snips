import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useHomePage } from '@/hooks/useApi';
import { HomePageComponent, Title } from '@/api/client';
import logger from '@/utils/logger';

const { width: screenWidth } = Dimensions.get('window');

const CARD_WIDTH = screenWidth * 0.3;
const LARGE_CARD_WIDTH = screenWidth * 0.45;
const CARD_HEIGHT = CARD_WIDTH * 1.5;
const LARGE_CARD_HEIGHT = LARGE_CARD_WIDTH * 1.5;

const HomePage: React.FC = () => {
  const { data, isLoading, error } = useHomePage();

  useEffect(() => {
    if (data) {
      logger.log('HomePage data loaded');
      logger.display(data, 'HomePage Data');
    }
    if (error) {
      logger.error('HomePage error:', error);
    }
  }, [data, error]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load content</Text>
      </View>
    );
  }

  const renderTitleCard = (item: Title, isLarge: boolean = false) => {
    const cardWidth = isLarge ? LARGE_CARD_WIDTH : CARD_WIDTH;
    const cardHeight = isLarge ? LARGE_CARD_HEIGHT : CARD_HEIGHT;

    return (
      <View style={[styles.card, { width: cardWidth, marginRight: 12 }]}>
        <Image
          source={{ uri: item.posterUrl || item.poster_url }}
          style={[styles.cardImage, { height: cardHeight }]}
          resizeMode="cover"
        />
        {item.badges && item.badges.length > 0 && (
          <View style={styles.badgeContainer}>
            {item.badges.map((badge: any, index: number) => (
              <View key={index} style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))}
          </View>
        )}
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.nameEn || item.name_en}
        </Text>
      </View>
    );
  };

  const renderSection = (section: HomePageComponent, sectionIndex: number) => {
    const isLarge = section.componentType === 'LARGE_COVERS';

    // Log to debug duplicate keys
    logger.log(`Section ${sectionIndex}: ${section.sectionTitle}, Items:`, section.titles?.map((t: any, i: number) => ({
      index: i,
      id: t.id,
      key: `section-${sectionIndex}-item-${i}-${t.id || 'no-id'}`
    })));

    return (
      <View key={`section-${sectionIndex}-${section.id}`} style={styles.section}>
        <Text style={styles.sectionTitle}>{section.sectionTitle}</Text>
        <FlatList
          horizontal
          data={section.titles}
          renderItem={({ item }) => renderTitleCard(item, isLarge)}
          keyExtractor={(item, index) => `section-${sectionIndex}-item-${index}-${item.id || 'no-id'}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Snips</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {data?.data?.components?.map((component, index) => renderSection(component, index))}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 8,
  },
  cardImage: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
});

export default HomePage;