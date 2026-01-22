import React, { useState, useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  SafeAreaView,
} from 'react-native';
import Video from 'react-native-video';
import { useFeedPage } from '@/hooks/useApi';
import { Title } from '@/api/client';
import SaveIcon from '@/assets/icons/Save-bookmark.svg';
import EpisodesIcon from '@/assets/icons/Episodes.svg';
import ShareIcon from '@/assets/icons/Share.svg';
import DotsIcon from '@/assets/icons/Dots.svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface FeedItemProps {
  item: Title;
  isActive: boolean;
}

const FeedItem: React.FC<FeedItemProps> = ({ item, isActive }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isPaused, setIsPaused] = useState(!isActive);

  React.useEffect(() => {
    setIsPaused(!isActive);
  }, [isActive]);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <View style={styles.feedItem}>
      <TouchableOpacity
        style={styles.videoContainer}
        activeOpacity={1}
        onPress={togglePlayPause}
      >
        {item.video_playback_url ? (
          <Video
            source={{ uri: item.video_playback_url }}
            style={styles.video}
            resizeMode="cover"
            paused={isPaused}
            repeat={true}
            muted={false}
            poster={item.poster_url || item.posterUrl}
            posterResizeMode="cover"
          />
        ) : (
          <Image
            source={{ uri: item.poster_url || item.posterUrl || 'https://via.placeholder.com/400x800' }}
            style={styles.video}
            resizeMode="cover"
          />
        )}

        {/* Gradient Overlay */}
        <View style={styles.gradientOverlay} />

        {/* Video Info */}
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle}>{item.name_en || item.nameEn}</Text>

          <TouchableOpacity onPress={toggleDescription} style={styles.descriptionContainer}>
            <Text
              style={styles.videoDescription}
              numberOfLines={isDescriptionExpanded ? undefined : 2}
            >
              {item.captions_en || 'No description available'}
            </Text>
            {!isDescriptionExpanded && (item.captions_en && item.captions_en.length > 100) && (
              <Text style={styles.moreText}>...more</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.iconPlaceholder}>
              <SaveIcon width={36} height={36} fill="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>24 k</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.iconPlaceholder}>
              <EpisodesIcon width={24} height={24} fill="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Episodes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.iconPlaceholder}>
              <ShareIcon width={24} height={24} fill="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.iconPlaceholder}>
              <DotsIcon width={24} height={24} fill="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Play/Pause Indicator */}
        {isPaused && (
          <View style={styles.playPauseOverlay}>
            <View style={styles.playButton}>
              <Text style={styles.playButtonText}>▶️</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const FeedPage: React.FC = () => {
  const { data, isLoading, error } = useFeedPage(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

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
        <Text style={styles.errorText}>Failed to load feed</Text>
      </View>
    );
  }

  const renderItem = ({ item, index }: { item: Title; index: number }) => (
    <FeedItem item={item} isActive={index === activeIndex} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data?.feedTitles || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={screenHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        removeClippedSubviews
        maxToRenderPerBatch={2}
        windowSize={3}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
  feedItem: {
    width: screenWidth,
    height: screenHeight,
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000000',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  videoInfo: {
    position: 'absolute',
    bottom: 180,
    left: 16,
    right: 80,
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  descriptionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  videoDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  moreText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtons: {
    position: 'absolute',
    right: 16,
    bottom: 180,
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  playPauseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    fontSize: 40,
  },
});

export default FeedPage;