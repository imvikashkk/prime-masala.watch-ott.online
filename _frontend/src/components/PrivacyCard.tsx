import { Shield, User, Trash2 } from 'lucide-react';

const PRIVACY_ITEMS = [
  {
    Icon: Shield,
    color: 'text-green-600',
    bg: 'bg-green-50',
    text: 'Data encrypted in transit',
    detail: 'Your data is securely transferred',
  },
  {
    Icon: User,
    color: 'text-primary',
    bg: 'bg-blue-50',
    text: 'No data shared with third parties',
    detail: 'Data is not shared with other companies',
  },
  {
    Icon: Trash2,
    color: 'text-accent',
    bg: 'bg-pink-50',
    text: 'You can request data deletion',
    detail: 'Developer provides a way to request deletion',
  },
];

const PrivacyCard = () => (
  <section>
    <div className="border border-g200 rounded-2xl overflow-hidden mb-9">
      <div className="px-5 py-4 bg-g50 border-b border-g200">
        <div className="text-lg font-bold text-foreground mb-0.5">
          App Privacy
        </div>
        <div className="text-xs text-g500">
          The developer indicated how this app handles data
        </div>
      </div>
      <div className="px-5 py-4">
        {PRIVACY_ITEMS.map((p, i) => (
          <div
            key={i}
            className={`flex items-start gap-3.5 py-2.5 ${
              i < PRIVACY_ITEMS.length - 1
                ? 'border-b border-g100 pb-3.5 mb-1.5'
                : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${p.bg}`}
            >
              <p.Icon className={`w-4 h-4 ${p.color}`} />
            </div>
            <div>
              <div className="text-[13px] text-g900 font-medium leading-snug">
                {p.text}
              </div>
              <div className="text-xs text-g500">{p.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PrivacyCard;
