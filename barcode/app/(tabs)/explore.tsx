import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Platform } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import api from "../../src/api/api";

export default function ScanTab() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  if (!permission) {
    return <View style={styles.center}><Text>İzin durumu bekleniyor…</Text></View>;
  }
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Kamera izni gerekli.</Text>
        <Button title="İzin ver" onPress={requestPermission} />
      </View>
    );
  }

  // Web'de kamera yoksa
  if (Platform.OS === "web") {
    return <View style={styles.center}><Text>Tarama web’de desteklenmiyor.</Text></View>;
  }

  const onBarcodeScanned = async ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    setMsg(`Taranan: ${data}`);
    try {
      await api.get(`/api/products/${data}`);
      router.push(`/product/${data}`);
    } catch {
      setMsg(`Ürün bulunamadı: ${data}`);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!scanned ? (
        <CameraView
          key={scanned ? "off" : "on"}
          style={{ flex: 1 }}
          barcodeScannerSettings={{ barcodeTypes: ["ean13", "ean8", "qr", "code128"] }}
          onBarcodeScanned={onBarcodeScanned}
        />
      ) : (
        <View style={styles.center}>
          <Text style={{ marginBottom: 12 }}>{msg}</Text>
          <Button title="Tekrar Tara" onPress={() => { setMsg(""); setScanned(false); }} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
