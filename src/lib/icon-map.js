import {
  Users, Zap, DollarSign, FileText, Home, Receipt,
  User, Search, FileCheck, BarChart2, Camera, Film,
  Globe, MapPin, Layers, SplitSquareVertical, Gavel,
  Landmark, Heart, ShieldCheck, Car, Shield,
} from 'lucide-react';

const ICON_MAP = {
  Users, Zap, DollarSign, FileText, Home, Receipt,
  User, Search, FileCheck, BarChart2, Camera, Film,
  Globe, MapPin, Layers, SplitSquareVertical, Gavel,
  Landmark, Heart, ShieldCheck, Car, Shield,
};

export const getIcon = (name) => ICON_MAP[name] || FileText;
