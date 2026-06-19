import {
  Users, Zap, DollarSign, FileText, Home, Receipt,
  User, Search, FileCheck, BarChart2, Camera, Film,
  Globe, MapPin, Layers, SplitSquareVertical, Gavel,
  Landmark, Heart, HeartCrack, ShieldCheck, Car, Shield,
  Network, Scale, Calculator, Building2, Key, Handshake,
  Briefcase, Clock, Star, Award, Phone, Mail, MessageCircle,
  ChevronRight, ArrowRight, Check, X, AlertCircle, Info,
  Ruler, TrendingUp, BarChart, PieChart, Wallet, CreditCard,
} from 'lucide-react';

const ICON_MAP = {
  Users, Zap, DollarSign, FileText, Home, Receipt,
  User, Search, FileCheck, BarChart2, Camera, Film,
  Globe, MapPin, Layers, SplitSquareVertical, Gavel,
  Landmark, Heart, HeartCrack, ShieldCheck, Car, Shield,
  Network, Scale, Calculator, Building2, Key, Handshake,
  Briefcase, Clock, Star, Award, Phone, Mail, MessageCircle,
  ChevronRight, ArrowRight, Check, X, AlertCircle, Info,
  Ruler, TrendingUp, BarChart, PieChart, Wallet, CreditCard,
};

export const getIcon = (name) => ICON_MAP[name] || FileText;
