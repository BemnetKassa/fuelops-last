"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";

const categories = [
  { value: "STATION_NOT_WORKING", label: "Station not working" },
  { value: "POOR_SERVICE", label: "Poor service" },
  { value: "BRIBERY", label: "Bribery" },
  { value: "BLACK_MARKET", label: "Black market" },
  { value: "SAFETY", label: "Safety" },
  { value: "OTHER", label: "Other" },
];

const statusBadge = (status: string) => {
  switch (status) {
    case "OPEN":
      return <Badge className="bg-amber-500">OPEN</Badge>;
    case "UNDER_REVIEW":
      return <Badge className="bg-blue-600">UNDER_REVIEW</Badge>;
    case "RESOLVED":
      return <Badge className="bg-emerald-600">RESOLVED</Badge>;
    case "REJECTED":
      return <Badge variant="destructive">REJECTED</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

interface Station {
  id: string;
  name: string;
}

interface ReportItem {
  id: string;
  category: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  station?: { name?: string } | null;
}

const ReportsPage = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [category, setCategory] = useState<string>("STATION_NOT_WORKING");
  const [stationId, setStationId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = useMemo(() => localStorage.getItem("fuelops-token"), []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [stationsRes, reportsRes] = await Promise.all([
          fetch("http://localhost:3001/api/station", {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
              "Content-Type": "application/json",
            },
          }),
          fetch("http://localhost:3001/api/driver/reports", {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
              "Content-Type": "application/json",
            },
          }),
        ]);

        if (stationsRes.ok) {
          const data = await stationsRes.json();
          setStations(
            data.map((s: any) => ({
              id: String(s.id),
              name: s.name,
            }))
          );
        }

        if (reportsRes.ok) {
          const data = await reportsRes.json();
          setReports(data);
        } else {
          const err = await reportsRes.json();
          setError(err.message || "Failed to load reports.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim() || !description.trim() || !category) {
      setError("Please fill out category, title, and description.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("http://localhost:3001/api/driver/reports", {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          title: title.trim(),
          description: description.trim(),
          stationId: stationId || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to submit report.");
        return;
      }

      setReports((prev) => [data, ...prev]);
      setTitle("");
      setDescription("");
      setStationId("");
      setCategory("STATION_NOT_WORKING");
      setSuccess("Report submitted. Thank you for helping keep the network safe.");
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="border-0 bg-gradient-to-br from-amber-50 via-background to-emerald-50 shadow-sm">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-500/10 p-2">
              <ShieldAlert className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">Driver Reports</CardTitle>
              <p className="text-muted-foreground">
                Flag stations that are not operating correctly or report suspicious behavior.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <Badge key={item.value} variant="outline" className="bg-white/60">
                {item.label}
              </Badge>
            ))}
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Submit a report</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {success}
                </div>
              )}

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Station (optional)</Label>
                <Select value={stationId} onValueChange={setStationId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a station" />
                  </SelectTrigger>
                  <SelectContent>
                    {stations.map((station) => (
                      <SelectItem key={station.id} value={station.id}>
                        {station.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Short summary of the issue"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what happened, when, and who was involved."
                  rows={6}
                />
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit report"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent reports</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading reports...</div>
            ) : reports.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center text-muted-foreground">
                <AlertTriangle className="h-6 w-6" />
                <p>No reports submitted yet.</p>
              </div>
            ) : (
              <ScrollArea className="h-[420px] pr-3">
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-semibold">{report.title}</h4>
                            <Badge variant="outline">{report.category.replaceAll("_", " ")}</Badge>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">{report.description}</p>
                          <p className="mt-3 text-xs text-muted-foreground">
                            {report.station?.name ? `Station: ${report.station.name}` : "Station: Not specified"}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {statusBadge(report.status)}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4" />
                            {new Date(report.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
