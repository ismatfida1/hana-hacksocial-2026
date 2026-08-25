import { useEffect, useState } from "react";
import { ExternalLink, Plus, Save, Archive } from "lucide-react";
import { trpc } from "@/lib/trpc";

type OpportunityDraft = {
  title: string;
  type: string;
  detail: string;
  officialUrl: string;
  deadlineAt: string;
  eligibility: string;
  prizeDetails: string;
  active: boolean;
};

const emptyDraft: OpportunityDraft = { title: "", type: "Hackathon", detail: "", officialUrl: "", deadlineAt: "", eligibility: "", prizeDetails: "", active: true };

function toInputDate(value?: Date | string | null) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 16);
}

export function AdminOpportunityManager() {
  const utils = trpc.useUtils();
  const list = trpc.opportunities.adminList.useQuery();
  const create = trpc.opportunities.adminCreate.useMutation({ onSuccess: () => { setDraft(emptyDraft); void utils.opportunities.adminList.invalidate(); void utils.opportunities.list.invalidate(); } });
  const update = trpc.opportunities.adminUpdate.useMutation({ onSuccess: () => { setEditingId(null); void utils.opportunities.adminList.invalidate(); void utils.opportunities.list.invalidate(); } });
  const archive = trpc.opportunities.adminArchive.useMutation({ onSuccess: () => { void utils.opportunities.adminList.invalidate(); void utils.opportunities.list.invalidate(); } });
  const verify = trpc.opportunities.adminVerify.useMutation({ onSuccess: () => { setNotice("Official page checked."); void utils.opportunities.adminList.invalidate(); void utils.opportunities.list.invalidate(); } });
  const [draft, setDraft] = useState<OpportunityDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const error = create.error || update.error || archive.error;
    if (error) setNotice(error.message);
  }, [create.error, update.error, archive.error]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setNotice("");
    const input = { ...draft, deadlineAt: draft.deadlineAt ? new Date(draft.deadlineAt).toISOString() : null, prizeDetails: draft.prizeDetails || null };
    if (editingId) update.mutate({ id: editingId, changes: input });
    else create.mutate(input);
  };

  const edit = (item: NonNullable<typeof list.data>[number]) => {
    setEditingId(item.id);
    setDraft({ title: item.title, type: item.type, detail: item.detail, officialUrl: item.officialUrl, deadlineAt: toInputDate(item.deadlineAt), eligibility: item.eligibility, prizeDetails: item.prizeDetails || "", active: item.active === 1 });
    setNotice("");
  };

  return <section className="mt-4 rounded-3xl border border-[#C9BFE3] bg-[#F5F3FB] p-4" aria-label="Admin opportunity management">
    <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#62566A]">Owner tools</p><h2 className="mt-1 font-display text-2xl text-[#3A3540]">Manage opportunities</h2><p className="mt-1 text-xs leading-4 text-[#625D65]">Every saved official link is checked on the server. Students see only active records.</p></div><Plus size={18} className="text-[#725F78]" /></div>
    <form onSubmit={submit} className="mt-4 grid gap-2">
      <input required value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="Opportunity title" className="rounded-xl border border-[#D9CEC4] bg-white px-3 py-2.5 text-sm text-[#3A3540]" />
      <input required value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value })} placeholder="Type, for example Hackathon" className="rounded-xl border border-[#D9CEC4] bg-white px-3 py-2.5 text-sm text-[#3A3540]" />
      <textarea required value={draft.detail} onChange={(event) => setDraft({ ...draft, detail: event.target.value })} placeholder="How it works" className="min-h-20 rounded-xl border border-[#D9CEC4] bg-white px-3 py-2.5 text-sm text-[#3A3540]" />
      <input required type="url" value={draft.officialUrl} onChange={(event) => setDraft({ ...draft, officialUrl: event.target.value })} placeholder="Official HTTPS URL" className="rounded-xl border border-[#D9CEC4] bg-white px-3 py-2.5 text-sm text-[#3A3540]" />
      <label className="text-xs font-bold text-[#62566A]">Current deadline<input type="datetime-local" value={draft.deadlineAt} onChange={(event) => setDraft({ ...draft, deadlineAt: event.target.value })} className="mt-1 w-full rounded-xl border border-[#D9CEC4] bg-white px-3 py-2.5 text-sm font-normal text-[#3A3540]" /></label>
      <textarea required value={draft.eligibility} onChange={(event) => setDraft({ ...draft, eligibility: event.target.value })} placeholder="Eligibility from the official rules" className="min-h-16 rounded-xl border border-[#D9CEC4] bg-white px-3 py-2.5 text-sm text-[#3A3540]" />
      <input value={draft.prizeDetails} onChange={(event) => setDraft({ ...draft, prizeDetails: event.target.value })} placeholder="Prize or outcome details (optional)" className="rounded-xl border border-[#D9CEC4] bg-white px-3 py-2.5 text-sm text-[#3A3540]" />
      <label className="flex items-center gap-2 text-xs font-bold text-[#62566A]"><input type="checkbox" checked={draft.active} onChange={(event) => setDraft({ ...draft, active: event.target.checked })} className="size-4 accent-[#947DA3]" /> Show to students</label>
      <div className="flex gap-2"><button type="submit" disabled={create.isPending || update.isPending} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3A3540] px-3 py-2.5 text-xs font-bold text-white"><Save size={14} />{editingId ? "Save changes" : "Add opportunity"}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setDraft(emptyDraft); }} className="rounded-xl border border-[#D9CEC4] bg-white px-3 py-2.5 text-xs font-bold text-[#62566A]">Cancel</button>}</div>
    </form>
    {notice && <p className="mt-2 text-xs text-[#9B6068]" role="alert">{notice}</p>}
    <div className="mt-5 space-y-2">{list.isLoading ? <p className="text-xs text-[#746B72]">Loading records…</p> : list.data?.map((item) => <article key={item.id} className="rounded-2xl border border-[#D9CEC4] bg-white p-3"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-sm font-bold text-[#3A3540]">{item.title}</p><p className="mt-1 text-xs text-[#746B72]">{item.active ? "Active" : "Archived"} · {item.verificationStatus} · {item.deadlineAt ? new Date(item.deadlineAt).toLocaleString() : "No deadline entered"} · {item.verifiedAt ? (Date.now() - new Date(item.verifiedAt).getTime() > 30 * 86_400_000 ? `Review recommended · checked ${new Date(item.verifiedAt).toLocaleDateString()}` : `Checked ${new Date(item.verifiedAt).toLocaleString()}`) : "Not checked yet"}</p></div><a href={item.officialUrl} target="_blank" rel="noreferrer" aria-label={`Open ${item.title} official page`}><ExternalLink size={15} className="text-[#3157C8]" /></a></div><div className="mt-2 flex gap-2"><button type="button" onClick={() => edit(item)} className="rounded-lg bg-[#E5E5F0] px-2.5 py-1.5 text-xs font-bold text-[#51486A]">Edit</button><button type="button" onClick={() => verify.mutate({ id: item.id })} disabled={verify.isPending} className="rounded-lg bg-[#EAF0F8] px-2.5 py-1.5 text-xs font-bold text-[#3157C8]">Verify now</button><button type="button" onClick={() => archive.mutate({ id: item.id })} disabled={!item.active || archive.isPending} className="flex items-center gap-1 rounded-lg bg-[#F6E9EA] px-2.5 py-1.5 text-xs font-bold text-[#6F4D55] disabled:opacity-50"><Archive size={13} />Archive</button></div></article>)}</div>
  </section>;
}
