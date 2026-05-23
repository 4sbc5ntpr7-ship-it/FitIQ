import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAuth } from './useAuth';

export interface UserProfile {
  uid: string;
  email?: string;
  age: number;
  weight: number;
  height: number;
  fitnessGoal: 'lose' | 'gain' | 'maintain';
  dailyCalorieTarget: number;
  createdAt: Date;
  updatedAt: Date;
}

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setError(null);
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          } as UserProfile);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    try {
      setError(null);
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date(),
      });
      setProfile((prev) => (prev ? { ...prev, ...updates } : null));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const createProfile = async (data: Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;

    try {
      setError(null);
      const profileData: UserProfile = {
        ...data,
        uid: user.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, profileData);
      setProfile(profileData);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    createProfile,
  };
};
