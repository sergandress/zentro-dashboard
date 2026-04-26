import { useState } from "react";
import { Calendar, DollarSign, Users, Settings, Download, X } from "lucide-react";

export default function ZentroDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showConfig, setShowConfig] = useState(false);

  const appointments = [
    { id: 1, client: "Maria González", service: "Limpieza Facial", date: "2026-04-26", time: "2:00 PM", price: 75, status: "Confirmada", paymentStatus: "Pagado" },
    { id: 2, client: "Juan Pérez", service: "Botox", date: "2026-04-27", time: "10:30 AM", price: 350, status: "Confirmada", paymentStatus: "Pagado" },
    { id: 3, client: "Ana Rodríguez", service: "Rellenos", date: "2026-04-28", time: "3:15 PM", price: 250, status: "Confirmada", paymentStatus: "Pagado" },
    { id: 4, client: "Carlos López", service: "Láser", date: "2026-04-29", time: "11:00 AM", price: 200, status: "En proceso", paymentStatus: "Pendiente" },
    { id: 5, client: "Sofia Reyes", service: "Limpieza Facial", date: "2026-04-30", time: "4:30 PM", price: 75, status: "Confirmada", paymentStatus: "Pagado" },
  ];

  const leads = [
    { id: 1, name: "Roberto Martínez", phone: "(787) 555-9876", service: "Botox", qualified: true, source: "WhatsApp" },
    { id: 2, name: "Elena Morales", phone: "(787) 555-5432", service: "Rellenos", qualified: true, source: "Instagram" },
    { id: 3, name: "Daniel Sánchez", phone: "(787) 555-6789", service: "Láser", qualified: false, source: "Llamada" },
    { id: 4, name: "Laura Jiménez", phone: "(787) 555-4321", service: "Limpieza Facial", qualified: true, source: "WhatsApp" },
  ];

  const totalRevenue = appointments.filter(a => a.paymentStatus === "Pagado").reduce((s, a) => s + a.price, 0);
  const pendingRevenue = appointments.filter(a => a.paymentStatus === "Pendiente").reduce((s, a) => s + a.price, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", color: "white", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ background: "#0d1526", borderBottom: "1px solid #1e293b", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800 }}><span style={{ color: "#10b981" }}>Zentro</span>AI</div>
          <div style={{ fontSize: 11, color: "#64748b" }}>Assistant Manager</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setShowConfig(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "white", cursor: "pointer", fontSize: 13 }}>
            <Settings size={14} /> Config
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#10b981", border: "none", borderRadius: 8, color: "white", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
            <Download size={14} /> Reporte
          </button>
        </div>
      </div>

      <div style={{ background: "#0d1526", borderBottom: "1px solid #1e293b", padding: "0 24px", display: "flex", gap: 4 }}>
        {[{ id: "overview", label: "Overview" }, { id: "citas", label: "Citas" }, { id: "leads", label: "Leads" }, { id: "pagos", label: "Pagos" }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "14px 16px", background: "none", border: "none", borderBottom: activeTab === tab.id ? "2px solid #10b981" : "2px solid transparent", color: activeTab === tab.id ? "#10b981" : "#64748b", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
        {activeTab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 24 }}>
              {[
                { label: "Citas Hoy", value: appointments.filter(a => a.date === "2026-04-26").length, color: "#10b981" },
                { label: "Ingresos Cobrados", value: `$${totalRevenue}`, color: "#10b981" },
                { label: "Pendiente de Cobro", value: `$${pendingRevenue}`, color: "#f59e0b" },
                { label: "Leads Calificados", value: leads.filter(l => l.qualified).length, color: "#3b82f6" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#0d1526", border: "1px solid #1e293b", borderRadius: 12, padding: "20px 24px" }}>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>{s.label}</div>
                  <div style={{ fontSize: 30, fontWeight: 800, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#0d1526", border: "1px solid #1e293b", borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 14 }}>📅 Citas de Hoy</div>
              {appointments.filter(a => a.date === "2026-04-26").map(apt => (
                <div key={apt.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "#1e293b", borderRadius: 8, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{apt.client}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>{apt.service} · {apt.time}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: "#10b981" }}>${apt.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "citas" && (
          <div style={{ background: "#0d1526", border: "1px solid #1e293b", borderRadius: 12, overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#1e293b" }}>
                {["Cliente", "Servicio", "Fecha", "Hora", "Precio", "Estado", "Pago"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#94a3b8" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {appointments.map((apt, i) => (
                  <tr key={apt.id} style={{ borderTop: "1px solid #1e293b" }}>
                    <td style={{ padding: "13px 16px", fontSize: 13, fontWeight: 600 }}>{apt.client}</td>
                    <td style={{ padding: "13px 16px", fontSize: 13, color: "#94a3b8" }}>{apt.service}</td>
                    <td style={{ padding: "13px 16px", fontSize: 13, color: "#94a3b8" }}>{apt.date}</td>
                    <td style={{ padding: "13px 16px", fontSize: 13, color: "#94a3b8" }}>{apt.time}</td>
                    <td style={{ padding: "13px 16px", fontSize: 13, fontWeight: 700, color: "#10b981" }}>${apt.price}</td>
                    <td style={{ padding: "13px 16px" }}><span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: apt.status === "Confirmada" ? "#064e3b" : "#78350f", color: apt.status === "Confirmada" ? "#10b981" : "#fbbf24" }}>{apt.status}</span></td>
                    <td style={{ padding: "13px 16px" }}><span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: apt.paymentStatus === "Pagado" ? "#1e3a5f" : "#1e293b", color: apt.paymentStatus === "Pagado" ? "#60a5fa" : "#94a3b8" }}>{apt.paymentStatus}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "leads" && (
          <div style={{ background: "#0d1526", border: "1px solid #1e293b", borderRadius: 12, overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#1e293b" }}>
                {["Nombre", "Teléfono", "Servicio", "Calificado", "Fuente"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#94a3b8" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} style={{ borderTop: "1px solid #1e293b" }}>
                    <td style={{ padding: "13px 16px", fontSize: 13, fontWeight: 600 }}>{lead.name}</td>
                    <td style={{ padding: "13px 16px", fontSize: 13, color: "#94a3b8" }}>{lead.phone}</td>
                    <td style={{ padding: "13px 16px", fontSize: 13, color: "#94a3b8" }}>{lead.service}</td>
                    <td style={{ padding: "13px 16px" }}><span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: lead.qualified ? "#064e3b" : "#1e293b", color: lead.qualified ? "#10b981" : "#94a3b8" }}>{lead.qualified ? "✓ Sí" : "✗ No"}</span></td>
                    <td style={{ padding: "13px 16px", fontSize: 13, color: "#94a3b8" }}>{lead.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "pagos" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 24 }}>
              <div style={{ background: "#064e3b", border: "1px solid #065f46", borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 12, color: "#6ee7b7", marginBottom: 8 }}>Pagos Completados</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: "#10b981" }}>${totalRevenue}</div>
              </div>
              <div style={{ background: "#78350f", border: "1px solid #92400e", borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 12, color: "#fcd34d", marginBottom: 8 }}>Pendiente</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: "#f59e0b" }}>${pendingRevenue}</div>
              </div>
              <div style={{ background: "#1e3a5f", border: "1px solid #1e40af", borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 12, color: "#93c5fd", marginBottom: 8 }}>Total Esperado</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: "#3b82f6" }}>${totalRevenue + pendingRevenue}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showConfig && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
          <div style={{ background: "#0d1526", border: "1px solid #1e293b", borderRadius: 16, width: "100%", maxWidth: 480 }}>
            <div style={{ padding: "18px 24px", borderBottom: "1px solid #1e293b", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700 }}>⚙️ Configuración del Cliente</div>
              <button onClick={() => setShowConfig(false)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <div style={{ padding: 24 }}>
              {[["Nombre del Negocio", "Clínica Estética San Juan"], ["Teléfono", "(787) 555-0123"], ["Horario", "9:00 AM – 6:00 PM"], ["Servicios", "Limpieza Facial, Botox, Rellenos, Láser"]].map(([label, val]) => (
                <div key={label} style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 6 }}>{label}</label>
                  <input defaultValue={val} style={{ width: "100%", padding: "10px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "white", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <button style={{ width: "100%", padding: 12, background: "#10b981", border: "none", borderRadius: 8, color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 8 }}>Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
