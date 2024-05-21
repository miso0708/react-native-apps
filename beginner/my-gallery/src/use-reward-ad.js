import { AdMobRewarded } from 'expo-ads-admob'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'

const UNIT_ID = Platform.select({
	// android: "ca-app-pub-8972432524889079/3386482480"
	android: __DEV__ ? "ca-app-pub-3940256099942544/5224354917" : "ca-app-pub-8972432524889079/3386482480"
})

export const useRewardAd = () => {
	const [isLoaded, setIsLoaded] = useState(false);	// 광고가 로딩이 됐는지
	const [isRewarded, setIsRewarded] = useState(false);	// 보상을 받을 수 있는 상태까지 광고를 시청
	const [isClosed, setIsClosed] = useState(false);	// 광고가 닫혔는지

	const loadRewardAd = async () => {
		await AdMobRewarded.setAdUnitID(UNIT_ID);
		await AdMobRewarded.requestAdAsync();
		await AdMobRewarded.showAdAsync();
	}

	const resetIsRewardedNIsClosed = () => {
		setIsLoaded(false);
		setIsRewarded(false);
		setIsClosed(false);
	}

	useEffect(() => {
		AdMobRewarded.addEventListener('rewardedVideoDidLoad', () => {
			console.log('rewardedVideoDidLoad');
			setIsLoaded(true);
		});
		AdMobRewarded.addEventListener('rewardedVideoUserDidEarnReward', () => {
			console.log('rewardedVideoUserDidEarnReward');
			setIsRewarded(true);
		});
		AdMobRewarded.addEventListener('rewardedVideoDidDismiss', () => {
			console.log('rewardedVideoDidDismiss');
			setIsClosed(true);
		});
		return () => {
			AdMobRewarded.removeAllListeners();
		}
	}, []);

	return {
		loadRewardAd,
		isLoaded,
		isRewarded,
		isClosed,
		resetIsRewardedNIsClosed,
	};
}