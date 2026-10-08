import React, { useEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/stack';
import apiRequest from '../../api/apirequest';

type FilteredResultsRouteProp = RouteProp<RootStackParamList, 'FilteredResults'>;

interface Restaurant {
    id: number;
    name: string;
    about: string;
    locationAddress: string;
    isPriceRangeVisible?: boolean;
    cuisineType?: {
        id: number;
        name: string;
    } | null;
    restaurantImages?: {
        restaurantImgUrl?: string;
    }[];
}

const parseList = (payload: any): Restaurant[] => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    return [];
};

const FilteredResults: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<FilteredResultsRouteProp>();
    const { filters, searchText } = route.params;

    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const queryParams = useMemo(
        () => ({
            CuisineTypeId: filters.cuisineTypeId ?? undefined,
            cuisine: filters.cuisine?.trim() || undefined,
            priceRange: filters.price || undefined,
            seatingType: filters.seating || undefined,
            features: filters.features.length ? filters.features.join(',') : undefined,
            Latitude: filters.nearMe ? filters.latitude ?? undefined : undefined,
            Longitude: filters.nearMe ? filters.longitude ?? undefined : undefined,
            RadiusInKm: filters.nearMe ? filters.radiusInKm ?? 10 : undefined,
            NearMe: filters.nearMe || undefined,
            Name: searchText?.trim() || undefined,
            PageNumber: 1,
            PageSize: 20,
        }),
        [filters, searchText],
    );

    const fetchFiltered = async () => {
        try {
            setLoading(true);
            setError(null);

            let response;
            try {
                response = await apiRequest.get(
                    '/Restaurants/get-all-filtered',
                    { params: queryParams },
                );
            } catch (getError: any) {
                if (![400, 404, 405].includes(getError.response?.status)) {
                    throw getError;
                }

                response = await apiRequest.post(
                    '/Restaurants/get-all-filtered',
                    queryParams,
                );
            }

            setRestaurants(parseList(response.data));
        } catch (e: any) {
            setError(e.response?.data?.message || e.response?.data?.Message || 'Failed to load filtered restaurants');
            setRestaurants([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiltered();
    }, [queryParams]);

    if (loading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/icon/left.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>Filtered Results</Text>
                <View style={{ width: 24 }} />
            </View>

            {error ? (
                <View style={styles.emptyWrap}>
                    <Text style={styles.emptyText}>{error}</Text>
                </View>
            ) : restaurants.length === 0 ? (
                <View style={styles.emptyWrap}>
                    <Text style={styles.emptyText}>No favorites yet</Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.listContent}>
                    {restaurants.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.card}
                            onPress={() => navigation.navigate('SingleRestaurant', { id: item.id })}>
                            <Image
                                source={
                                    item.restaurantImages?.[0]?.restaurantImgUrl
                                        ? { uri: item.restaurantImages[0].restaurantImgUrl }
                                        : require('../../assets/images/restaurantcard.png')
                                }
                                style={styles.image}
                                resizeMode="cover"
                            />
                            <View style={styles.info}>
                                <Text style={styles.name}>{item.name}</Text>
                                <View style={styles.row}>
                                    <Image source={require('../../assets/images/icon/meal.png')} />
                                    <Text style={styles.meta} numberOfLines={1}>
                                        {item.cuisineType?.name || 'Cuisine'} • {item.isPriceRangeVisible ? '$$' : '$'}
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Image source={require('../../assets/images/icon/restLocation.png')} />
                                    <Text style={styles.meta} numberOfLines={1}>
                                        {item.locationAddress}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 60,
    },
    centered: { justifyContent: 'center', alignItems: 'center' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingHorizontal: 2,
    },
    title: { fontSize: 18, fontWeight: '700', color: '#111' },
    listContent: {
        paddingBottom: 24,
        gap: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 6,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 170,
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 8,
        paddingVertical: 8,
        gap: 6,
        backgroundColor: '#FFFFFF',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        color: '#070707',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 2,
    },
    meta: {
        fontSize: 14,
        fontWeight: '400',
        color: '#8A9197',
        lineHeight: 20,
        letterSpacing: -0.28,
        flex: 1,
    },
    emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    emptyText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#C0C0C0',
        textAlign: 'center',
    },
});

export default FilteredResults;
