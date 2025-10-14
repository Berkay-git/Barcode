import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
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

export default function HomeScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const res = await api.get<Product[]>("/api/products/");
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (e: any) {
        setError(e?.message || "Bağlantı hatası");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Ürünler yükleniyor…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Bağlantı hatası: {error}</Text>
        <Text style={{ marginTop: 6, fontSize: 12 }}>URL: /api/products/</Text>
      </View>
    );
  }

  if (!products.length) {
    return (
      <View style={styles.center}>
        <Text>Hiç ürün yok.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 12, paddingTop: 40 }}>
      <Text style={styles.title}>🛍️ Ürün Listesi</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.barcodeid.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/product/${item.barcodeid}`)}
            style={styles.card}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text>Tür: {item.typ} | Renk: {item.color || "-"}</Text>
            <Text>Beden: {item.size || "-"} | Fiyat: ₺{item.price} | Stok: {item.stock}</Text>
            <Text style={styles.barcode}>Barkod: {item.barcodeid}</Text>
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 12 },
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 12, marginBottom: 10, elevation: 2 },
  name: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  barcode: { fontSize: 12, color: "#666", marginTop: 4 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
