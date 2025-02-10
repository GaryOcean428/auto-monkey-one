import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { setupMFA, verifyMFA } from "@/lib/auth";
import { QrCode } from "lucide-react";

export default function MFASetup() {
  const [qrCode, setQrCode] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSetup = async () => {
    setLoading(true);
    try {
      const { qr, secret } = await setupMFA();
      setQrCode(qr);
      setSecret(secret);
    } catch (error) {
      console.error("MFA setup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      await verifyMFA(code);
    } catch (error) {
      console.error("MFA verification error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-[400px] bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75 border-border/50 shadow-xl shadow-primary/5">
        <CardHeader>
          <CardTitle>Set up Two-Factor Authentication</CardTitle>
          <CardDescription>
            Enhance your account security with 2FA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!qrCode ? (
            <Button onClick={handleSetup} className="w-full" disabled={loading}>
              <QrCode className="mr-2 h-4 w-4" />
              Set up 2FA
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <img src={qrCode} alt="QR Code" className="w-48 h-48" />
              </div>
              <div className="space-y-2">
                <Label>Verification Code</Label>
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                />
              </div>
              <Button
                onClick={handleVerify}
                className="w-full"
                disabled={loading || code.length !== 6}
              >
                Verify
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
