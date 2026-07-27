import { useState, useEffect } from "react";
import {
  Award,
  IndianRupee,
  Percent,
  Building2,
  TrendingUp,
  BarChart3,
  Calendar,
  Sparkles,
  Download,
  Info,
  CheckCircle2
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  PLACEMENT_KPIS,
  COMPENSATION_STATS,
  PLACEMENT_PERCENTAGE_STATS,
} from "@/data/placementData";

// Icon mapping helper
const ICON_MAP = {
  Award: Award,
  IndianRupee: IndianRupee,
  Percent: Percent,
  Building2: Building2,
};

// Custom Tooltip for Compensation Chart
function CustomCompTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-2xl border border-border/80 shadow-lift text-xs sm:text-sm">
        <p className="font-extrabold text-foreground mb-2 flex items-center gap-1.5 border-b border-border/60 pb-1.5">
          <Calendar className="h-3.5 w-3.5 text-primary" /> Academic Year {label}
        </p>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-6">
            <span className="flex items-center gap-2 font-semibold text-slate-700">
              <span className="h-2.5 w-2.5 rounded-full bg-[#123A72]" /> Highest CTC:
            </span>
            <span className="font-extrabold text-[#123A72] text-sm">
              {payload[0]?.value} LPA
            </span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="flex items-center gap-2 font-semibold text-slate-700">
              <span className="h-2.5 w-2.5 rounded-full bg-[#0D9488]" /> Average CTC:
            </span>
            <span className="font-extrabold text-[#0D9488] text-sm">
              {payload[1]?.value} LPA
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

// Custom Tooltip for Placement Percentage Chart
function CustomRateTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-2xl border border-border/80 shadow-lift text-xs sm:text-sm">
        <p className="font-extrabold text-foreground mb-2 flex items-center gap-1.5 border-b border-border/60 pb-1.5">
          <Calendar className="h-3.5 w-3.5 text-primary" /> Academic Year {label}
        </p>
        <div className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-2 font-semibold text-slate-700">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" /> Placement Rate:
          </span>
          <span className="font-extrabold text-[#2563EB] text-base">
            {payload[0]?.value}%
          </span>
        </div>
      </div>
    );
  }
  return null;
}

export function PlacementStatsView() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"charts" | "table">("charts");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-surface/50 min-h-screen">
      <div className="container-page">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/10">
            <TrendingUp className="h-3.5 w-3.5" /> Placement Track Record
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Placement Statistics & Trends
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Consistently delivering exceptional career milestones for 26+ years with steady growth across highest packages, average CTC, and placement ratios.
          </p>
        </div>

        {/* 1. Summary Cards Above Charts (4 KPI Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {PLACEMENT_KPIS.map((kpi, idx) => {
            const IconComponent = ICON_MAP[kpi.iconName];
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-white border border-border/80 p-6 shadow-sm hover:shadow-lift hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Top Subtle Gradient Stripe */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${kpi.color}`} />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {kpi.label}
                    </span>
                    <div className="h-11 w-11 rounded-xl bg-primary-soft/80 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {kpi.value}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mt-2 font-medium">
                    {kpi.subtext}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                  <Sparkles className="h-3 w-3" />
                  <span>{kpi.trend}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tab Switcher & Action Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" /> 5-Year Historical Placement Growth
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Academic Years 2025–26 down to 2021–22 (Descending Order)
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-border/80 rounded-2xl p-1 shadow-sm">
            <button
              onClick={() => setActiveTab("charts")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "charts"
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground/70 hover:text-primary hover:bg-primary-soft/50"
              }`}
            >
              Interactive Charts
            </button>
            <button
              onClick={() => setActiveTab("table")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "table"
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground/70 hover:text-primary hover:bg-primary-soft/50"
              }`}
            >
              Data Table View
            </button>
          </div>
        </div>

        {/* 2. Interactive Charts Section */}
        {activeTab === "charts" ? (
          <div className="space-y-10">
            {/* Chart 1: Compensation Graph (Grouped Bar Chart) */}
            <div className="rounded-3xl bg-white border border-border/80 p-6 sm:p-8 shadow-sm hover:shadow-card transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/60">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight">
                    Compensation Package Trend (Highest vs. Average CTC)
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Grouped Bar Chart showing Highest Package & Average Package (in LPA) over 5 academic years.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-md bg-[#123A72]" /> Highest CTC (LPA)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-md bg-[#0D9488]" /> Average CTC (LPA)
                  </div>
                </div>
              </div>

              {isMounted ? (
                <div className="h-[340px] sm:h-[400px] w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={COMPENSATION_STATS}
                      margin={{ top: 20, right: 20, left: -10, bottom: 10 }}
                      barGap={6}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                      <XAxis
                        dataKey="year"
                        tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
                        axisLine={{ stroke: '#E2E8F0' }}
                        tickLine={false}
                      />
                      <YAxis
                        unit=" LPA"
                        tick={{ fill: '#475569', fontSize: 12 }}
                        axisLine={{ stroke: '#E2E8F0' }}
                        tickLine={false}
                        domain={[0, 32]}
                      />
                      <Tooltip content={<CustomCompTooltip />} cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }} />
                      <Legend
                        verticalAlign="top"
                        align="right"
                        wrapperStyle={{ paddingBottom: '16px', fontSize: '13px', fontWeight: 600 }}
                      />
                      <Bar
                        name="Highest CTC (LPA)"
                        dataKey="highest"
                        fill="#123A72"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={48}
                        animationDuration={1200}
                      />
                      <Bar
                        name="Average CTC (LPA)"
                        dataKey="average"
                        fill="#0D9488"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={48}
                        animationDuration={1400}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[340px] flex items-center justify-center text-muted-foreground text-sm font-medium">
                  Loading compensation chart...
                </div>
              )}
            </div>

            {/* Chart 2: Placement Percentage Graph */}
            <div className="rounded-3xl bg-white border border-border/80 p-6 sm:p-8 shadow-sm hover:shadow-card transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/60">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight">
                    Placement Percentage Trend
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Overall percentage of eligible students successfully placed across all engineering & professional streams.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" /> Peak 91% in 2025–26 Batch
                </div>
              </div>

              {isMounted ? (
                <div className="h-[320px] sm:h-[380px] w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={PLACEMENT_PERCENTAGE_STATS}
                      margin={{ top: 20, right: 20, left: -10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                      <XAxis
                        dataKey="year"
                        tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
                        axisLine={{ stroke: '#E2E8F0' }}
                        tickLine={false}
                      />
                      <YAxis
                        unit="%"
                        domain={[0, 100]}
                        tick={{ fill: '#475569', fontSize: 12 }}
                        axisLine={{ stroke: '#E2E8F0' }}
                        tickLine={false}
                      />
                      <Tooltip content={<CustomRateTooltip />} cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }} />
                      <Bar
                        name="Placement %"
                        dataKey="rate"
                        fill="#2563EB"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={56}
                        animationDuration={1300}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[320px] flex items-center justify-center text-muted-foreground text-sm font-medium">
                  Loading placement rate chart...
                </div>
              )}
            </div>
          </div>
        ) : (
          /* 3. Comprehensive Data Table View */
          <div className="rounded-3xl bg-white border border-border/80 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-border/60 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Historical Data Summary (5 Academic Years)
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Comparison matrix of packages and placement percentages.
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted text-foreground text-xs font-semibold hover:bg-muted/80 transition-colors"
              >
                <Download className="h-3.5 w-3.5" /> Export Data
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 border-b border-border/60 text-xs uppercase font-extrabold text-foreground/80 tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Academic Year</th>
                    <th className="px-6 py-4 text-right">Highest Package (LPA)</th>
                    <th className="px-6 py-4 text-right">Average Package (LPA)</th>
                    <th className="px-6 py-4 text-right">Placement Percentage</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 font-medium">
                  {COMPENSATION_STATS.map((row, idx) => {
                    const rateRow = PLACEMENT_PERCENTAGE_STATS.find(
                      (p) => p.year === row.year
                    );
                    return (
                      <tr
                        key={row.year}
                        className="hover:bg-primary-soft/30 transition-colors"
                      >
                        <td className="px-6 py-4 font-bold text-primary flex items-center gap-2">
                          <Calendar className="h-4 w-4 opacity-70" />
                          {row.year}
                          {idx === 0 && (
                            <span className="text-[10px] font-bold uppercase bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full">
                              Latest Batch
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-foreground">
                          {row.highest} LPA
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-emerald-600">
                          {row.average} LPA
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-blue-600">
                          {rateRow?.rate}%
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-muted/30 border-t border-border/60 text-xs text-muted-foreground flex items-center gap-2">
              <Info className="h-4 w-4 text-primary shrink-0" />
              <span>
                Note: All placement data is verified by the RKGIT Training & Placement Cell. Salary packages refer to Cost to Company (CTC) per annum.
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
