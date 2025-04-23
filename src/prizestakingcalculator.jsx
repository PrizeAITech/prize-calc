import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";

export default function PrizeStakingCalculator() {
  const [totalStaked, setTotalStaked] = useState(700_000_000);
  const [userStake, setUserStake] = useState(10000);
  const [industryPercent, setIndustryPercent] = useState(10);

  const INDUSTRY_TOTAL = 400_000_000_000;
  const BUSINESS_CUT = 0.03; // 3 cents per dollar
  const MAX_REVENUE = INDUSTRY_TOTAL * BUSINESS_CUT;

  const revenueCaptured = (industryPercent / 100) * MAX_REVENUE;
  const userShare = userStake / totalStaked;
  const userRevenue = userShare * revenueCaptured;
  const apr = (userRevenue / userStake) * 100;

  const tokenPriceFor20APR = (revenueCaptured / totalStaked) / 0.20;

  const formatNumber = (num) =>
    num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  const formatInputValue = (num) => num.toLocaleString();
  const parseInputValue = (val) => Number(val.replace(/,/g, ""));

  return (
    <div
      className="mx-auto p-6"
      style={{ maxWidth: '1200px', fontFamily: 'Chelsea Market', color: 'black' }}
    >
      <div
        style={{
          border: '2px solid white',
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: '#FFF031',
          boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
        }}
      >
        {/* Header spans full width */}
        <div
          className="w-full py-4 text-3xl font-bold text-center tracking-wide"
          style={{
            backgroundColor: '#454545',
            color: 'white',
            border: '3px solid white',
            fontFamily: 'Chelsea Market',
          }}
        >
          $PRIZE Staking Calculator
        </div>
        {/* Content section with padding */}
        <div
          className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{ backgroundColor: '#FFF031' }}
        >
          {/* Left inputs */}
          <div className="space-y-8 pt-6">
            <div>
              <label
                className="font-semibold text-black"
                style={{ fontSize: '1.3rem' }}
              >
                Total $PRIZE Tokens Currently Staked
              </label>
              <Input
                className="text-black mt-1"
                style={{ fontSize: '1.4rem' }}
                type="text"
                value={formatInputValue(totalStaked)}
                onChange={(e) => setTotalStaked(parseInputValue(e.target.value))}
              />
              <p className="mt-1" style={{ fontSize: '1rem' }}>
                Enter the total number of $PRIZE tokens currently staked on the platform. This number can be found at the top of this webpage.
              </p>
            </div>
            <div>
              <label
                className="font-semibold text-black"
                style={{ fontSize: '1.3rem' }}
              >
                Your $PRIZE Stake
              </label>
              <Input
                className="text-black mt-1"
                style={{ fontSize: '1.4rem' }}
                type="text"
                value={formatInputValue(userStake)}
                onChange={(e) => setUserStake(parseInputValue(e.target.value))}
              />
              <p className="mt-1" style={{ fontSize: '1rem' }}>
                Enter how many $PRIZE tokens you are considering to stake.
              </p>
            </div>
            <div>
              <label
                className="font-semibold text-black"
                style={{ fontSize: '1.3rem' }}
              >
                Industry Revenue Capture (% of $400B)
              </label>
              <Slider
                min={2}
                max={100}
                step={1}
                value={[industryPercent]}
                onValueChange={(val) => setIndustryPercent(val[0])}
              />
              <div
                className="mt-2 text-black"
                style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
              >
                {industryPercent}%
              </div>
              <p className="mt-1" style={{ fontSize: '1rem' }}>
                Adjust the slider to estimate what portion of the $400 billion annually revenue the arcade, vending, and gaming industry the business captures.
              </p>
              <hr className="border-black my-2" />
              <p className="mt-1" style={{ fontSize: '1rem' }}>
                • All the results in the green box are based on the fee of 3 cents per dollar from that industry revenue.
              </p>
              <p className="mt-1" style={{ fontSize: '1rem' }}>
                • The results and figures you have placed in the white fields are all based on your speculations & the potential outcomes from Prize AI Technologies business activities.
              </p>
            </div>
          </div>
          {/* Results box */}
          <div>
            <CardContent
              className="space-y-6 pt-6 shadow-md"
              style={{
                backgroundColor: '#57B42D',
                borderRadius: '20px',
                padding: '24px',
                border: '3px solid white',
              }}
            >
              <div className="text-2xl font-bold text-center text-white">
                RESULTS
              </div>
              <hr className="border-white" />
              <div>
                <strong style={{ fontSize: '1.3rem' }}>
                  Staking Revenue (USD):
                </strong>
                <div
                  style={{ color: '#1427B8', fontSize: '1.5rem', fontWeight: 'bold' }}
                >
                  ${formatNumber(userRevenue)}
                </div>
                <p className="text-sm text-white">
                  This is the estimated revenue in USD that your staked $PRIZE tokens would generate based on the captured market share.
                </p>
              </div>
              <hr className="border-white" />
              <div>
                <strong style={{ fontSize: '1.3rem' }}>
                  APR (Annual Percentage Return):
                </strong>
                <div
                  style={{ color: '#1427B8', fontSize: '1.5rem', fontWeight: 'bold' }}
                >
                  {formatNumber(apr)}%
                </div>
                <p className="text-sm text-white">
                  This is your projected return on staked tokens as a percentage, calculated annually.
                </p>
              </div>
              <hr className="border-white" />
              <div>
                <strong style={{ fontSize: '1.3rem' }}>
                  Predicted Token Price @ 20% APR:
                </strong>
                <div
                  style={{ color: '#1427B8', fontSize: '1.5rem', fontWeight: 'bold' }}
                >
                  ${formatNumber(tokenPriceFor20APR)}
                </div>
                <p className="text-sm text-white">
                  This is the estimated value of a single $PRIZE token assuming every staked token earns 20% APR under the current revenue capture scenario.
                </p>
              </div>
              <div>
                <a
                  href="https://www.prizetech.xyz/buy-prize-ico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 rounded-md text-white text-lg font-semibold text-center transition-transform duration-200"
                  style={{ backgroundColor: '#1427B8', border: '3px solid white' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  BUY PRIZE
                </a>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
}
