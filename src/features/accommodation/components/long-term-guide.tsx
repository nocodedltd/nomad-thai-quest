import AccommodationSelection from "./accommodation-selection";

export default function LongTermGuide({ userType }: { userType?: 'guest' | 'free' | 'paid' }) {
  return <AccommodationSelection userType={userType || 'free'} />;
}
