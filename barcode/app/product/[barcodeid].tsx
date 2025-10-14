import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import api from "../../src/api/api";

type Product = {
  barcodeid: number;
  name: string;
  typ: string;
  color?: string;
  size?: string;
  price: number;
  stock: number;
  sex?: "M" | "F" | "U";
};

export default function ProductDetail() {
  const { barcodeid } = useLocalSearchParams<{ barcodeid: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const res = await api.get<Product>(`/api/products/${barcodeid}`);
        setProduct(res.data);
      } catch (e: any) {
        setError(e?.message || "Bağlantı hatası");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [barcodeid]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /><Text>Yükleniyor…</Text></View>;
  if (error)   return <View style={styles.center}><Text>Bağlantı hatası: {error}</Text></View>;
  if (!product) return <View style={styles.center}><Text>Ürün bulunamadı.</Text></View>;

  return (
    <View style={{ padding: 16, paddingTop: 40 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>{product.name}</Text>
      <Text>Tip: {product.typ}</Text>
      <Text>Renk: {product.color || "-"}</Text>
      <Text>Beden: {product.size || "-"}</Text>
      <Text>Fiyat: ₺{product.price}</Text>
      <Text>Stok: {product.stock}</Text>
      <Text>Cinsiyet: {product.sex || "-"}</Text>
      <Text style={{ marginTop: 8, color: "#666" }}>Barkod: {product.barcodeid}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
