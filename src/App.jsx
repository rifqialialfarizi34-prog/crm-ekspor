import React, { useState, useEffect, useRef } from 'react';

// --- BAGIAN IKON (Internal SVG - Stabil) ---
const Icon = ({ name, size = 16, className = "" }) => {
  let content;
  switch (name) {
    case 'dashboard': content = <><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></>; break;
    case 'users': content = <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>; break;
    case 'phone': content = <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>; break;
    case 'whatsapp': content = <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>; break;
    case 'download': content = <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></>; break;
    case 'upload': content = <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></>; break;
    case 'plus': content = <><path d="M5 12h14"/><path d="M12 5v14"/></>; break;
    case 'search': content = <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>; break;
    case 'trash': content = <><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></>; break;
    case 'edit': content = <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>; break;
    case 'save': content = <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></>; break;
    case 'x': content = <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>; break;
    case 'globe': content = <><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>; break;
    case 'mail': content = <><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>; break;
    case 'calendar': content = <><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></>; break;
    case 'check': content = <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>; break;
    case 'alert': content = <circle cx="12" cy="12" r="10"><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></circle>; break;
    case 'clock': content = <circle cx="12" cy="12" r="10"><polyline points="12 6 12 12 16 14"/></circle>; break;
    case 'chart': content = <><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></>; break;
    case 'instagram': content = <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>; break;
    case 'bell': content = <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>; break;
    case 'flame': content = <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>; break;
    case 'snowflake': content = <><path d="M2 12h20"/><path d="M12 2v20"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/></>; break;
    case 'menu': content = <><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></>; break;
    case 'user': content = <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>; break;
    default: content = <circle cx="12" cy="12" r="10"/>;
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {content}
    </svg>
  );
};

// --- LOGIKA IMPORT CSV (Anti-Crash) ---
const parseCSV = (text) => {
  const lines = text.split(/\r\n|\n/);
  if (lines.length < 1) return [];

  let headerIndex = -1;
  let detectedHeaders = [];

  for (let i = 0; i < Math.min(lines.length, 20); i++) {
    const lineLower = lines[i].toLowerCase();
    if (lineLower.includes('nama perusahaan')) {
      headerIndex = i;
      const headerRow = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      detectedHeaders = headerRow.map(h => h.toLowerCase().replace(/['"]+/g, '').trim());
      break;
    }
  }

  if (headerIndex === -1) {
    alert("Gagal Import: Kolom 'Nama Perusahaan' tidak ditemukan.");
    return [];
  }

  const colIndex = {
    company: detectedHeaders.findIndex(h => h.includes('nama perusahaan')),
    owner: detectedHeaders.findIndex(h => h.includes('nama owner') || h.includes('pic')),
    website: detectedHeaders.findIndex(h => h.includes('website')),
    email: detectedHeaders.findIndex(h => h.includes('email')),
    wa: detectedHeaders.findIndex(h => h.includes('whatsapp') || h.includes('wa')),
    telp: detectedHeaders.findIndex(h => h.includes('no telp') || h.includes('telephone') || h.includes('phone')),
    instagram: detectedHeaders.findIndex(h => h.includes('instagram') || h.includes('ig') || h.includes('sosmed')),
    country: detectedHeaders.findIndex(h => h.includes('negara')),
    address: detectedHeaders.findIndex(h => h.includes('alamat') || h.includes('address') || h.includes('lokasi')),
    industry: detectedHeaders.findIndex(h => h.includes('keterangan') || h.includes('bidang') || h.includes('produk'))
  };

  const results = [];
  const baseId = Date.now();
  
  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const dataRow = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const cleanRow = dataRow.map(val => val ? val.trim().replace(/^"|"$/g, '').replace(/""/g, '"') : '');

    if (cleanRow.length > 1) {
      let obj = {
        id: baseId + i + Math.random(),
        status: 'New Lead',
        interest: 'Unknown',
        nextAction: '',
        company: '', owner: '', country: '', address: '', whatsapp: '', telephone: '', email: '', website: '', instagram: '', industry: '', notes: ''
      };

      const getVal = (idx) => (idx > -1 && cleanRow[idx] && cleanRow[idx] !== '-') ? cleanRow[idx] : '';

      let rawComp = getVal(colIndex.company);
      if (rawComp.startsWith('http') || rawComp.includes('www.')) {
         obj.website = rawComp; 
         obj.company = "Unknown"; 
      } else {
         obj.company = rawComp;
      }

      obj.owner = getVal(colIndex.owner);
      obj.country = getVal(colIndex.country);
      obj.industry = getVal(colIndex.industry);
      obj.instagram = getVal(colIndex.instagram);
      obj.website = getVal(colIndex.website) || obj.website || '';

      let rawEmail = getVal(colIndex.email);
      if (rawEmail.includes('@') && rawEmail.length < 60 && !rawEmail.includes(' ')) obj.email = rawEmail;

      let rawAddr = getVal(colIndex.address);
      if (!rawAddr.startsWith('http') && rawAddr.length < 200) obj.address = rawAddr;

      const cleanNum = (n) => n ? n.replace(/[^0-9+]/g, '') : '';
      obj.whatsapp = cleanNum(getVal(colIndex.wa));
      obj.telephone = cleanNum(getVal(colIndex.telp));

      if (obj.company && obj.company !== "Unknown" && obj.company.toLowerCase() !== 'nama perusahaan') {
        results.push(obj);
      }
    }
  }
  return results;
};

const App = () => {
  const [buyers, setBuyers] = useState(() => {
    try {
      const saved = localStorage.getItem('export-crm-v14');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]); 
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('export-crm-v14', JSON.stringify(buyers));
  }, [buyers]);

  const getCountryTime = (countryName) => {
    if (!countryName) return null;
    try {
      const c = countryName.toLowerCase();
      let offset = 0;
      if (c.includes('uae') || c.includes('arab') || c.includes('dubai')) offset = 4;
      else if (c.includes('indonesia') || c.includes('jakarta')) offset = 7;
      else if (c.includes('italy') || c.includes('italia') || c.includes('rome') || c.includes('germany') || c.includes('france') || c.includes('spain') || c.includes('netherland')) offset = 1;
      else if (c.includes('uk') || c.includes('london')) offset = 0;
      else if (c.includes('usa') || c.includes('ny') || c.includes('states')) offset = -5;
      else if (c.includes('china') || c.includes('singapore') || c.includes('hk')) offset = 8;
      else if (c.includes('japan') || c.includes('tokyo')) offset = 9;
      else if (c.includes('australia')) offset = 10;
      
      const utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
      const buyerTime = new Date(utc + (3600000 * offset));
      if (isNaN(buyerTime.getTime())) return null;
      return buyerTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    } catch (e) { return null; }
  };

  const emptyForm = {
    company: "", owner: "", country: "", address: "", industry: "",
    whatsapp: "", telephone: "", email: "", website: "", instagram: "",
    status: "New Lead", interest: "Unknown",
    nextAction: "", notes: ""
  };
  const [formData, setFormData] = useState(emptyForm);

  const stats = {
    total: buyers.length,
    new: buyers.filter(b => b.status === 'New Lead').length,
    contacted: buyers.filter(b => b.status === 'Contacted').length,
    negotiating: buyers.filter(b => b.status === 'Negotiating').length,
    closed: buyers.filter(b => b.status === 'Closed').length,
    lost: buyers.filter(b => b.status === 'Lost').length,
    hot: buyers.filter(b => ['Hot', 'Warm'].includes(b.interest)).length,
  };

  const upcomingSchedules = buyers
    .filter(b => b.nextAction && new Date(b.nextAction) >= new Date().setHours(0,0,0,0))
    .sort((a, b) => new Date(a.nextAction) - new Date(b.nextAction));

  const countryStats = buyers.reduce((acc, curr) => {
    const country = curr.country ? curr.country.toUpperCase().trim() : 'UNKNOWN';
    if (country.length > 1 && country !== '-') acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  const sortedCountries = Object.entries(countryStats).sort(([,a], [,b]) => b - a);

  const filteredAndSortedBuyers = buyers
    .filter(b => {
      const matchStatus = filterStatus === "All" || b.status === filterStatus;
      const matchSearch = (b.company || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (b.country || '').toLowerCase().includes(searchTerm.toLowerCase());
      return matchStatus && matchSearch;
    })
    .sort((a, b) => {
      const nameA = (a.company || '').trim();
      const nameB = (b.company || '').trim();
      if (!nameA) return 1; 
      if (!nameB) return -1;
      const getPriority = (str) => {
        if (!str) return 3;
        const c = str.charAt(0);
        if (/[0-9]/.test(c)) return 1; 
        if (/[a-zA-Z]/.test(c)) return 2; 
        return 3; 
      };
      const rankA = getPriority(nameA);
      const rankB = getPriority(nameB);
      if (rankA !== rankB) return rankA - rankB;
      return nameA.localeCompare(nameB, 'en', { numeric: true, sensitivity: 'base' });
    });

  // --- HANDLERS ---
  const handleExport = () => {
    if (buyers.length === 0) return alert("Data kosong");
    const headers = ["ID","Nama Perusahaan","Owner","Industri","Negara","Alamat","WhatsApp","Telepon","Email","Website","Instagram","Status","Minat","Catatan", "Jadwal FollowUp"];
    const escape = (t) => t ? `"${String(t).replace(/"/g, '""')}"` : '';
    const rows = [headers.join(','), ...buyers.map(b => [
      b.id, escape(b.company), escape(b.owner), escape(b.industry), escape(b.country), escape(b.address),
      escape(b.whatsapp), escape(b.telephone), escape(b.email), escape(b.website), escape(b.instagram),
      escape(b.status), escape(b.interest), escape(b.notes), escape(b.nextAction)
    ].join(','))];
    const link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURI(rows.join("\n"));
    link.download = `CRM_Export_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = parseCSV(ev.target.result);
        if (data.length > 0 && window.confirm(`Import ${data.length} data bersih?`)) setBuyers(prev => [...prev, ...data]);
        else alert("Format salah atau data kosong.");
      } catch { alert('Error reading file'); }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = isEditing ? buyers.map(b => b.id === formData.id ? formData : b) : [...buyers, { ...formData, id: Date.now() }];
    setBuyers(data); setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm('Hapus data ini?')) setBuyers(buyers.filter(b => b.id !== id));
  };

  const handleQuickUpdate = (id, field, value) => {
    setBuyers(buyers.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const handleSelectAll = (e) => {
    setSelectedIds(e.target.checked ? filteredAndSortedBuyers.map(b => b.id) : []);
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Hapus ${selectedIds.length} data terpilih?`)) {
      setBuyers(buyers.filter(b => !selectedIds.includes(b.id)));
      setSelectedIds([]);
    }
  };

  const handleBulkStatus = (newStatus) => {
    if (window.confirm(`Ubah ${selectedIds.length} data menjadi "${newStatus}"?`)) {
      setBuyers(buyers.map(b => selectedIds.includes(b.id) ? { ...b, status: newStatus } : b));
      setSelectedIds([]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New Lead': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Contacted': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Negotiating': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Closed': return 'bg-green-100 text-green-700 border-green-200';
      case 'Lost': return 'bg-gray-100 text-gray-500 border-gray-200';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getInterestColor = (interest) => {
    if (interest === 'Hot') return 'bg-red-100 text-red-600 border-red-200';
    if (interest === 'Warm') return 'bg-orange-100 text-orange-600 border-orange-200';
    if (interest === 'Cold') return 'bg-blue-50 text-blue-400 border-blue-100';
    return 'bg-gray-50 text-gray-500 border-gray-200';
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden relative">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden bg-white p-4 flex justify-between items-center shadow-sm z-30 fixed top-0 left-0 w-full">
        <div className="font-bold text-blue-600 flex items-center gap-2"><Icon name="globe"/> ExportPro</div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-slate-100 rounded"><Icon name="menu"/></button>
      </div>

      {/* SIDEBAR */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-700 hidden md:block">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Icon name="globe" className="text-blue-500" /> ExportPro
          </h1>
          <p className="text-xs text-slate-500 mt-1">V14.0 Final Edition</p>
        </div>
        <div className="p-4 md:hidden border-b border-slate-700 flex justify-between items-center">
           <span className="font-bold text-white">Menu</span>
           <button onClick={() => setIsMobileMenuOpen(false)}><Icon name="x"/></button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => {setActiveTab('dashboard'); setIsMobileMenuOpen(false)}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800'}`}>
            <Icon name="dashboard" /> Dashboard
          </button>
          <button onClick={() => {setActiveTab('database'); setIsMobileMenuOpen(false)}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'database' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800'}`}>
            <Icon name="users" /> Database Buyer
          </button>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden mt-16 md:mt-0">
        <header className="h-16 bg-white border-b border-slate-200 hidden md:flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-700">{activeTab === 'dashboard' ? 'Overview & Analytics' : 'Master Database Buyer'}</h2>
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-xs font-medium text-slate-600">
             <Icon name="clock" size={14} className="text-blue-500"/>
             <span>WIB: {new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 mb-16">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              {/* REMINDER */}
              <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-sm bg-gradient-to-r from-blue-50 to-white">
                <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2"><Icon name="bell" className="text-blue-600"/> Jadwal Follow Up Terdekat</h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {upcomingSchedules.length > 0 ? upcomingSchedules.map((item, idx) => (
                    <div key={idx} className="min-w-[260px] bg-white p-3 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-shadow relative">
                      <div className="flex justify-between items-start mb-1">
                         <div className="font-bold text-sm text-slate-700 truncate w-32" title={item.company}>{item.company}</div>
                         <div className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                           <Icon name="user" size={10}/> {item.owner || 'No Name'}
                         </div>
                      </div>
                      <div className="text-xs text-slate-500 mt-2 flex items-center gap-1 font-medium text-blue-600">
                        <Icon name="calendar" size={12}/> {item.nextAction}
                      </div>
                      <div className="mt-2 flex gap-2">
                         <span className={`text-[9px] px-1.5 py-0.5 rounded border ${getStatusColor(item.status)}`}>{item.status}</span>
                         <span className={`text-[9px] px-1.5 py-0.5 rounded border ${getInterestColor(item.interest)}`}>{item.interest}</span>
                      </div>
                    </div>
                  )) : <div className="text-sm text-slate-400 italic">Tidak ada jadwal follow up mendatang.</div>}
                </div>
              </div>

              {/* STATS CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-gray-400">
                  <div className="text-slate-500 text-[10px] font-bold uppercase">Total</div>
                  <div className="text-xl md:text-2xl font-bold text-slate-800 mt-1">{stats.total}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-red-500">
                  <div className="text-slate-500 text-[10px] font-bold uppercase">New Leads</div>
                  <div className="text-xl md:text-2xl font-bold text-red-500 mt-1">{stats.new}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-yellow-500">
                  <div className="text-slate-500 text-[10px] font-bold uppercase">Nego</div>
                  <div className="text-xl md:text-2xl font-bold text-yellow-600 mt-1">{stats.negotiating}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-green-500">
                  <div className="text-slate-500 text-[10px] font-bold uppercase">Closed</div>
                  <div className="text-xl md:text-2xl font-bold text-green-600 mt-1">{stats.closed}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-slate-500">
                  <div className="text-slate-500 text-[10px] font-bold uppercase">Lost</div>
                  <div className="text-xl md:text-2xl font-bold text-slate-600 mt-1">{stats.lost}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* FUNNEL LENGKAP */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Icon name="chart" className="text-blue-500"/> Funnel Lengkap</h3>
                  <div className="space-y-3">
                    {['Total', 'New Leads', 'Negotiating', 'Closed', 'Lost'].map((label, i) => {
                        let val = 0;
                        let color = 'gray';
                        if(label === 'Total') { val = stats.total; color = 'blue'; }
                        if(label === 'New Leads') { val = stats.new; color = 'red'; }
                        if(label === 'Negotiating') { val = stats.negotiating; color = 'yellow'; }
                        if(label === 'Closed') { val = stats.closed; color = 'green'; }
                        if(label === 'Lost') { val = stats.lost; color = 'slate'; }

                        return (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-24 text-xs font-bold text-slate-500 uppercase">{label}</div>
                                <div className={`flex-1 h-3 bg-${color === 'slate' ? 'gray' : color}-100 rounded-full overflow-hidden`}>
                                    <div className={`h-full bg-${color === 'slate' ? 'gray' : color}-500`} style={{width: stats.total ? `${(val/stats.total)*100}%` : '0%'}}></div>
                                </div>
                                <div className="w-10 text-right font-bold text-xs">{val}</div>
                            </div>
                        )
                    })}
                  </div>
                </div>

                {/* COUNTRIES */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-[300px]">
                   <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2 flex-shrink-0"><Icon name="globe" className="text-purple-500"/> Lokasi Buyer</h3>
                   <div className="space-y-4 overflow-y-auto pr-2 flex-1">
                    {sortedCountries.length > 0 ? sortedCountries.map(([country, count], i) => (
                        <div key={i} className="flex flex-col gap-1">
                          <div className="flex justify-between text-xs font-semibold text-slate-600">
                            <span>{country}</span>
                            <span>{count} ({Math.round((count / stats.total) * 100)}%)</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                             <div className="h-full bg-purple-500 rounded-full" style={{width: `${(count/stats.total)*100}%`}}></div>
                          </div>
                        </div>
                    )) : <div className="text-center text-slate-400 py-8 text-xs">Belum ada data.</div>}
                   </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-3">
                 <div onClick={() => fileInputRef.current.click()} className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 border border-blue-200 text-sm font-bold"><Icon name="upload"/> Import CSV</div>
                 <div onClick={handleExport} className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 border border-green-200 text-sm font-bold"><Icon name="download"/> Export CSV</div>
                 <input type="file" accept=".csv" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="bg-white rounded-xl border border-slate-200 flex flex-col h-full shadow-sm animate-fade-in">
              <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row justify-between gap-4 bg-white sticky top-0 z-20 rounded-t-xl">
                 <div className="flex gap-2 flex-1">
                    <div className="relative flex-1">
                      <div className="absolute left-3 top-2.5 text-slate-400"><Icon name="search"/></div>
                      <input type="text" placeholder="Cari..." className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                    </div>
                    <select className="px-3 py-2 border rounded-lg text-sm outline-none cursor-pointer bg-white" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                      <option value="All">All</option>
                      <option value="New Lead">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Negotiating">Nego</option>
                      <option value="Closed">Closed</option>
                    </select>
                 </div>
                 <button onClick={() => { setFormData(emptyForm); setIsEditing(false); setIsModalOpen(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700"><Icon name="plus"/> <span className="hidden md:inline">Tambah</span></button>
              </div>

              <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 sticky top-0 z-10 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="p-4 w-10 border-b text-center"><input type="checkbox" onChange={handleSelectAll} checked={filteredAndSortedBuyers.length > 0 && selectedIds.length === filteredAndSortedBuyers.length} className="cursor-pointer"/></th>
                      <th className="p-4 w-10 border-b text-center hidden md:table-cell">No</th>
                      <th className="p-4 border-b">Perusahaan</th>
                      <th className="p-4 border-b hidden md:table-cell">Lokasi</th>
                      <th className="p-4 border-b hidden md:table-cell">Kontak</th>
                      <th className="p-4 border-b">Medsos & Web</th>
                      <th className="p-4 border-b">Status</th>
                      <th className="p-4 border-b text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredAndSortedBuyers.map((buyer, index) => (
                      <tr key={buyer.id} className={`hover:bg-blue-50/30 group ${selectedIds.includes(buyer.id) ? 'bg-blue-50' : ''}`}>
                        <td className="p-4 align-top text-center"><input type="checkbox" checked={selectedIds.includes(buyer.id)} onChange={() => handleSelectOne(buyer.id)} className="cursor-pointer"/></td>
                        <td className="p-4 align-top text-center text-slate-400 font-mono text-xs hidden md:table-cell">{index + 1}</td>
                        
                        {/* PERUSAHAAN (Mobile Friendly) */}
                        <td className="p-4 align-top max-w-[200px]">
                          <div className="font-bold text-slate-800 text-base">{buyer.company || '-'}</div>
                          <div className="text-xs font-medium text-slate-500 mt-1">{buyer.owner || '-'}</div>
                          {/* Mobile View Extras */}
                          <div className="md:hidden mt-2 space-y-1">
                             <div className="text-xs flex items-center gap-1"><Icon name="globe" size={10}/> {buyer.country}</div>
                             <div className="text-xs flex items-center gap-1 text-green-600"><Icon name="whatsapp" size={10}/> {buyer.whatsapp || '-'}</div>
                          </div>
                        </td>

                        {/* LOKASI (Desktop) */}
                        <td className="p-4 align-top max-w-[150px] hidden md:table-cell">
                          <div className="font-bold text-slate-700 flex items-center gap-1 mb-1 text-xs uppercase">
                             <Icon name="globe" size={12} className="text-blue-400"/> {buyer.country || '-'}
                          </div>
                          {buyer.country && (
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded text-[10px] font-bold border border-yellow-100 mb-1">
                               <Icon name="clock" size={10}/> {getCountryTime(buyer.country) || '--:--'}
                            </div>
                          )}
                        </td>

                        {/* KONTAK (Desktop) */}
                        <td className="p-4 align-top min-w-[160px] hidden md:table-cell">
                           <div className="space-y-2">
                              <div className="flex items-center gap-2 text-xs">
                                 <Icon name="whatsapp" size={14} className="text-green-600"/>
                                 {buyer.whatsapp ? (
                                   <a href={`https://wa.me/${buyer.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" className="font-bold text-green-700 hover:underline">{buyer.whatsapp}</a>
                                 ) : <span className="text-slate-300">-</span>}
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                 <Icon name="mail" size={14} className="text-blue-500"/>
                                 {buyer.email ? <a href={`mailto:${buyer.email}`} className="text-blue-600 hover:underline truncate w-28 block">{buyer.email}</a> : <span className="text-slate-300">-</span>}
                              </div>
                           </div>
                        </td>

                        {/* MEDSOS & WEB */}
                        <td className="p-4 align-top min-w-[140px]">
                           <div className="flex flex-col gap-2">
                              {buyer.instagram ? (
                                <a href={buyer.instagram.startsWith('http') ? buyer.instagram : `https://instagram.com/${buyer.instagram}`} target="_blank" className="flex items-center gap-2 px-2 py-1 bg-pink-50 text-pink-700 rounded hover:bg-pink-100 border border-pink-100 text-xs font-medium transition-colors">
                                  <Icon name="instagram" size={12}/> Instagram
                                </a>
                              ) : <span className="text-slate-300 text-xs flex gap-1"><Icon name="instagram" size={12}/> -</span>}
                              
                              {buyer.website ? (
                                <a href={buyer.website} target="_blank" className="flex items-center gap-2 px-2 py-1 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 border border-slate-200 text-xs font-medium transition-colors">
                                  <Icon name="globe" size={12}/> Website
                                </a>
                              ) : <span className="text-slate-300 text-xs flex gap-1"><Icon name="globe" size={12}/> -</span>}
                           </div>
                        </td>

                        {/* QUICK EDIT COLUMNS */}
                        <td className="p-4 align-top min-w-[140px]">
                          <div className="flex flex-col gap-2">
                            {/* Status Select */}
                            <select 
                              value={buyer.status}
                              onChange={(e) => handleQuickUpdate(buyer.id, 'status', e.target.value)}
                              className={`text-[10px] font-bold px-2 py-1 rounded border cursor-pointer w-full appearance-none text-center ${getStatusColor(buyer.status)}`}
                            >
                              <option value="New Lead">New Lead</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Negotiating">Negotiating</option>
                              <option value="Closed">Closed</option>
                              <option value="Lost">Lost</option>
                            </select>

                            {/* Interest Select */}
                            <select 
                               value={buyer.interest}
                               onChange={(e) => handleQuickUpdate(buyer.id, 'interest', e.target.value)}
                               className={`text-[10px] font-bold px-2 py-1 rounded border cursor-pointer w-full appearance-none text-center ${getInterestColor(buyer.interest)}`}
                            >
                               <option value="Unknown">Unknown</option>
                               <option value="Cold">Cold</option>
                               <option value="Warm">Warm</option>
                               <option value="Hot">Hot</option>
                            </select>
                            
                            {/* Date Input Direct */}
                            <div className="relative">
                               <input 
                                 type="date" 
                                 className="w-full text-[10px] p-1 border rounded bg-slate-50 text-slate-600"
                                 value={buyer.nextAction || ''}
                                 onChange={(e) => handleQuickUpdate(buyer.id, 'nextAction', e.target.value)}
                               />
                            </div>
                          </div>
                        </td>

                        <td className="p-4 align-top text-right">
                          <div className="flex justify-end gap-1">
                             <button onClick={() => { setFormData(buyer); setIsEditing(true); setIsModalOpen(true); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Icon name="edit"/></button>
                             <button onClick={() => handleDelete(buyer.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Icon name="trash"/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* FLOATING BULK ACTION BAR */}
      {selectedIds.length > 0 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50 animate-bounce-in w-max max-w-[90%] overflow-x-auto">
          <span className="font-bold text-sm whitespace-nowrap">{selectedIds.length} Dipilih</span>
          <div className="h-4 w-px bg-slate-600"></div>
          <button onClick={() => handleBulkStatus('Contacted')} className="text-xs hover:text-yellow-300 whitespace-nowrap">Set Contacted</button>
          <button onClick={() => handleBulkStatus('Closed')} className="text-xs hover:text-green-300 whitespace-nowrap">Set Closed</button>
          <div className="h-4 w-px bg-slate-600"></div>
          <button onClick={handleBulkDelete} className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 whitespace-nowrap"><Icon name="trash" size={14}/> Hapus</button>
          <button onClick={() => setSelectedIds([])} className="ml-1"><Icon name="x"/></button>
        </div>
      )}

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-5 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
              <h3 className="font-bold text-lg">{isEditing ? 'Edit Data' : 'Tambah Baru'}</h3>
              <button onClick={() => setIsModalOpen(false)}><Icon name="x"/></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="md:col-span-2"><label className="text-xs font-bold text-slate-500 uppercase">Nama Perusahaan *</label><input required className="w-full mt-1 p-2 border rounded" value={formData.company} onChange={e=>setFormData({...formData, company:e.target.value})}/></div>
               <div><label className="text-xs font-bold text-slate-500 uppercase">Owner / PIC</label><input className="w-full mt-1 p-2 border rounded" value={formData.owner} onChange={e=>setFormData({...formData, owner:e.target.value})}/></div>
               <div><label className="text-xs font-bold text-slate-500 uppercase">Industri</label><input className="w-full mt-1 p-2 border rounded" value={formData.industry} onChange={e=>setFormData({...formData, industry:e.target.value})}/></div>
               
               <div className="md:col-span-2 border-t pt-2 mt-2"><span className="text-xs font-bold text-blue-600 uppercase">Kontak</span></div>
               <div><label className="text-xs font-bold text-slate-500 uppercase">WhatsApp (Utama)</label><input className="w-full mt-1 p-2 border rounded" value={formData.whatsapp} onChange={e=>setFormData({...formData, whatsapp:e.target.value})}/></div>
               <div><label className="text-xs font-bold text-slate-500 uppercase">Telepon Kantor</label><input className="w-full mt-1 p-2 border rounded" value={formData.telephone} onChange={e=>setFormData({...formData, telephone:e.target.value})}/></div>
               <div><label className="text-xs font-bold text-slate-500 uppercase">Email</label><input className="w-full mt-1 p-2 border rounded" value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})}/></div>
               <div><label className="text-xs font-bold text-slate-500 uppercase">Instagram URL</label><input className="w-full mt-1 p-2 border rounded" value={formData.instagram} onChange={e=>setFormData({...formData, instagram:e.target.value})}/></div>
               <div><label className="text-xs font-bold text-slate-500 uppercase">Website URL</label><input className="w-full mt-1 p-2 border rounded" value={formData.website} onChange={e=>setFormData({...formData, website:e.target.value})}/></div>
               
               <div className="md:col-span-2 border-t pt-2 mt-2"><span className="text-xs font-bold text-blue-600 uppercase">Lokasi</span></div>
               <div><label className="text-xs font-bold text-slate-500 uppercase">Negara</label><input className="w-full mt-1 p-2 border rounded" value={formData.country} onChange={e=>setFormData({...formData, country:e.target.value})}/></div>
               <div><label className="text-xs font-bold text-slate-500 uppercase">Alamat Lengkap</label><input className="w-full mt-1 p-2 border rounded" value={formData.address} onChange={e=>setFormData({...formData, address:e.target.value})}/></div>
               
               <div className="md:col-span-2 border-t pt-2 mt-2"><label className="text-xs font-bold text-slate-500 uppercase">Status</label><select className="w-full mt-1 p-2 border rounded" value={formData.status} onChange={e=>setFormData({...formData, status:e.target.value})}><option>New Lead</option><option>Contacted</option><option>Negotiating</option><option>Closed</option><option>Lost</option></select></div>
               
               <div className="md:col-span-2"><label className="text-xs font-bold text-slate-500 uppercase">Minat</label><select className="w-full mt-1 p-2 border rounded" value={formData.interest} onChange={e=>setFormData({...formData, interest:e.target.value})}><option>Unknown</option><option>Cold</option><option>Warm</option><option>Hot</option></select></div>

               <div><label className="text-xs font-bold text-slate-500 uppercase">Jadwal Follow Up</label><input type="date" className="w-full mt-1 p-2 border rounded" value={formData.nextAction} onChange={e=>setFormData({...formData, nextAction:e.target.value})}/></div>

               <div className="md:col-span-2"><label className="text-xs font-bold text-slate-500 uppercase">Catatan Umum</label><textarea rows="3" className="w-full mt-1 p-2 border rounded" value={formData.notes} onChange={e=>setFormData({...formData, notes:e.target.value})}/></div>
               <div className="md:col-span-2 flex justify-end gap-3 mt-4"><button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded">Batal</button><button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded font-bold">Simpan</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;