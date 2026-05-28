import {
  Bold,
  Italic,
  Link,
  Image,
  Calendar,ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CommunicationsAdminPortal() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen  p-1 font-sans">
      <div className="mx-auto max-w-[1380px]">
        
        <button
      onClick={() => navigate(-1)}
      className="group inline-flex items-center gap-2 rounded-xl border border-[#D7DCDA] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#1F2937] shadow-sm transition-all duration-200 hover:border-[#003A2B] hover:bg-[#F0F7F4] hover:text-[#003A2B] hover:shadow-md"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3F4F6] transition-all group-hover:bg-[#003A2B]">
        <ArrowLeft
          size={15}
          className="text-[#374151] group-hover:text-white"
        />
      </div>

      Back
    </button>

        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-[38px] font-bold tracking-tight text-[#003A2B]">
            Communications Admin Portal
          </h1>

          <div className="rounded-full bg-[#dcebdc] px-4 py-2 text-[11px] font-bold text-[#2f6b4d]">
            Last 24 Hours
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          
          {/* Total Recipients */}
          <div className="rounded border border-[#d7dcda] bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#7b8782]">
              Total Recipients
            </p>

            <h2 className="mt-3 text-[54px] font-black leading-none text-[#002E22]">
              12,482
            </h2>
          </div>

          {/* Delivered */}
          <div className="rounded border border-[#9dd2b7] bg-[#A9D9C1] p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#356a54]">
              Delivered
            </p>

            <h2 className="mt-3 text-[54px] font-black leading-none text-[#003325]">
              12,104
            </h2>

            <p className="mt-3 text-[11px] font-semibold text-[#245641]">
              96.9% Success Rate
            </p>
          </div>

          {/* Pending */}
          <div className="rounded border border-[#d7dcda] bg-white p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#7b8782]">
              Pending
            </p>

            <h2 className="mt-3 text-[54px] font-black leading-none text-[#1f2937]">
              312
            </h2>
          </div>

          {/* Failed */}
          <div className="rounded border border-[#efc2c2] bg-[#f5d1d1] p-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#a94444]">
              Failed
            </p>

            <h2 className="mt-3 text-[54px] font-black leading-none text-[#b91c1c]">
              66
            </h2>

            <button className="mt-3 text-[11px] font-semibold text-[#991b1b] underline">
              View Error Logs
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-5 grid grid-cols-[330px_1fr] gap-4">
          
          {/* LEFT PANEL */}
          <div className="space-y-4">
            
            {/* Define Audience */}
            <div className="rounded border border-[#d6dbd9] bg-white shadow-sm">
              
              <div className="border-b border-[#e3e7e5] px-4 py-3">
                <h2 className="text-[13px] font-black uppercase tracking-[1px] text-[#003A2B]">
                  1. Define Audience
                </h2>
              </div>

              <div className="space-y-4 p-4">
                
                <div>
                  <label className="mb-2 block text-[11px] font-bold text-[#4b5563]">
                    Target Group
                  </label>

                  <select className="h-[44px] w-full rounded border border-[#d5dbd8] bg-[#f8f9f8] px-3 text-[13px] text-[#1f2937] outline-none">
                    <option>All Institutional Users</option>
                  </select>
                </div>

                <div className="rounded border border-[#d9e7df] bg-[#f2f8f4] p-3">
                  <p className="text-[11px] leading-5 text-[#466153]">
                    Audience insight:
                    <span className="font-semibold">
                      {" "}
                      4,200 users currently match the "Pending Fee" filter.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Schedule Delivery */}
            <div className="rounded border border-[#d6dbd9] bg-white shadow-sm">
              
              <div className="border-b border-[#e3e7e5] px-4 py-3">
                <h2 className="text-[13px] font-black uppercase tracking-[1px] text-[#003A2B]">
                  2. Schedule Delivery
                </h2>
              </div>

              <div className="space-y-4 p-4">
                
                {/* Immediate */}
                <label className="flex cursor-pointer items-start gap-3 rounded border border-[#dce3df] p-3">
                  <input
                    type="radio"
                    name="delivery"
                    defaultChecked
                    className="mt-1"
                  />

                  <div>
                    <p className="text-[13px] font-semibold text-[#1f2937]">
                      Send Immediately
                    </p>

                    <p className="mt-1 text-[11px] text-[#6b7280]">
                      Dispatched within 60 seconds of approval
                    </p>
                  </div>
                </label>

                {/* Schedule */}
                <label className="flex cursor-pointer items-start gap-3 rounded border border-[#dce3df] p-3">
                  <input
                    type="radio"
                    name="delivery"
                    className="mt-1"
                  />

                  <div>
                    <p className="text-[13px] font-semibold text-[#1f2937]">
                      Schedule for Later
                    </p>

                    <p className="mt-1 text-[11px] text-[#6b7280]">
                      Set a future date and time
                    </p>
                  </div>
                </label>

                {/* Date Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="dd-mm-yyyy  --:--"
                    className="h-[42px] w-full rounded border border-[#d5dbd8] bg-[#f7f7f7] px-3 pr-10 text-[13px] outline-none"
                  />

                  <Calendar
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7b8782]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="rounded border border-[#d6dbd9] bg-white shadow-sm">
            
            {/* Tabs */}
            <div className="flex border-b border-[#e3e7e5]">
              <button className="border-b-2 border-[#003A2B] px-6 py-4 text-[13px] font-semibold text-[#003A2B]">
                Email Composer
              </button>

              <button className="px-6 py-4 text-[13px] font-semibold text-[#6b7280]">
                SMS Message
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              
              {/* Subject */}
              <div>
                <label className="mb-2 block text-[11px] font-bold text-[#4b5563]">
                  Email Subject Line
                </label>

                <input
                  type="text"
                  defaultValue="e.g. Urgent: Pending Fee Deadline Approaching"
                  className="h-[44px] w-full rounded border border-[#d5dbd8] px-3 text-[13px] text-[#4b5563] outline-none"
                />
              </div>

              {/* Message */}
              <div className="mt-5">
                <label className="mb-2 block text-[11px] font-bold text-[#4b5563]">
                  Message Body (Rich Text)
                </label>

                <div className="rounded border border-[#d5dbd8]">
                  
                  {/* Toolbar */}
                  <div className="flex items-center gap-4 border-b border-[#e3e7e5] px-4 py-3">
                    <button className="text-[#374151]">
                      <Bold size={15} />
                    </button>

                    <button className="text-[#374151]">
                      <Italic size={15} />
                    </button>

                    <button className="text-[#374151]">
                      <Link size={15} />
                    </button>

                    <button className="text-[#374151]">
                      <Image size={15} />
                    </button>
                  </div>

                  {/* Textarea */}
                  <textarea
                    rows={13}
                    defaultValue="Dear [Name], This is an official notice regarding..."
                    className="w-full resize-none p-4 text-[14px] leading-7 text-[#374151] outline-none"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex justify-end gap-3">
                <button className="h-[42px] rounded border border-[#d1d5db] bg-white px-6 text-[13px] font-semibold text-[#374151]">
                  Save Draft
                </button>

                <button className="h-[42px] rounded bg-[#003A2B] px-6 text-[13px] font-semibold text-white shadow">
                  Dispatch Broadcast
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}