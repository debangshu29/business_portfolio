import { X, ArrowLeft } from 'lucide-react';

// Import Demo components
import SweetCrumbs from '../demos/Bakery';
import RollingBites from '../demos/FoodTruck';
import LunaCo from '../demos/Photo';
import GlamPriya from '../demos/Makeup';
import InkSoul from '../demos/Tattoo';
import CleanHome from '../demos/Cleaning';

export default function DemoViewer({ activeDemo, onClose }) {

  const getDemoComponent = () => {
    switch (activeDemo) {
      case 'bakery':
        return <SweetCrumbs />;
      case 'foodtruck':
        return <RollingBites />;
      case 'photography':
        return <LunaCo />;
      case 'makeup':
        return <GlamPriya />;
      case 'tattoo':
        return <InkSoul />;
      case 'cleaning':
        return <CleanHome />;
      default:
        return <div>Demo Not Found</div>;
    }
  };

  const getDemoInfo = () => {
    switch (activeDemo) {
      case 'bakery':
        return { name: "Hearth & Harvest", niche: "" };
      case 'foodtruck':
        return { name: "Sage & Salt Kitchen", niche: "" };
      case 'photography':
        return { name: "Luna & Co Photography", niche: "" };
      case 'makeup':
        return { name: "Glam by Priya", niche: "" };
      case 'tattoo':
        return { name: "Ink & Soul Studio", niche: "" };
      case 'cleaning':
        return { name: "Spotless & Co.", niche: "House Cleaning" };
      default:
        return { name: "Live Demo", niche: "" };
    }
  };

  const info = getDemoInfo();

  return (
    <div className="demo-viewer-container">
      {/* Top Header Control Bar */}
      <div className="demo-viewer-bar">
        <div className="demo-viewer-title">
          <button className="demo-mode-btn" onClick={onClose} aria-label="Go back to portfolio">
            <ArrowLeft size={18} style={{ color: 'white', marginRight: '4px' }} />
          </button>
          <span className="demo-viewer-brand-name">{info.name}</span>
          {info.niche && <span className="demo-viewer-tag">{info.niche}</span>}
        </div>



        <button className="demo-viewer-close-btn" onClick={onClose}>
          <X size={16} />
          <span>Exit Demo</span>
        </button>
      </div>

      {/* Main Preview Pane */}
      <div className="demo-viewport-wrapper">
        <div className="demo-viewport desktop">
          {getDemoComponent()}
        </div>
      </div>
    </div>
  );
}
