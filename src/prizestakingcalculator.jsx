import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

export default function PrizeStakingCalculator() {
  const [totalStaked, setTotalStaked] = useState(700_000_000);
  const [userStake, setUserStake] = useState(10000);
  const [industryPercent, setIndustryPercent] = useState(10);
  const [tokenPrice, setTokenPrice] = useState(0.01);

  const INDUSTRY_TOTAL = 400_000_000_000;
  const BUSINESS_CUT = 0.03;
  const MAX_REVENUE = INDUSTRY_TOTAL * BUSINESS_CUT;

  // Core calculations
  const revenueCaptured = (industryPercent / 100) * MAX_REVENUE;
  const userRevenue = (userStake / totalStaked) * revenueCaptured;
  const initialInvestmentUSD = userStake * tokenPrice;
  // Use same formula for APY as APR (no compounding) so results match expected scale
  const apyPercent = initialInvestmentUSD > 0
    ? (userRevenue / initialInvestmentUSD) * 100
    : 0;
  const purchaseCost = userStake * tokenPrice;
  const tokenPriceFor20APR = (revenueCaptured / totalStaked) / 0.20;

  // Formatting helpers
  const formatNumber = (num, decimals = 2) =>
    num.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const formatInputValue = (num) => num.toLocaleString();
  const parseInputValue = (val) => Number(val.replace(/,/g, ""));

  return (
    <div
      className="calculator-wrapper"
      style={{ margin: '0 auto', padding: '1.5rem', maxWidth: '1200px', fontFamily: 'Chelsea Market', color: 'black', boxSizing: 'border-box' }}
    >
      {/* Yellow panel unchanged */}
      <div className="yellow-box">
        <div className="heading-box">
          <h1>$PRIZE Staking Calculator</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Input Panel (yellow) */}
          <div className="green-box" style={{ backgroundColor: '#FFF031', boxShadow: 'none' }}>
            <div style={{ color: '#1427B8', fontSize: '1.5rem' }}>
              <div className="space-y-8 pt-2">

                {/* Total Staked */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <label className="font-semibold text-blue-600 mb-1">
                    Total $PRIZE Tokens Currently Staked
                  </label>
                  <Input
                    type="text"
                    value={formatInputValue(totalStaked)}
                    onChange={(e) => setTotalStaked(parseInputValue(e.target.value))}
                    className="text-black"
                    style={{ fontSize: '1.3rem', padding: '10px', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }}
                  />
                  <p style={{ fontSize: '1rem', color: 'black', margin: '0.5rem 0' }}>
                    Add the current $PRIZE total amount for accurate calculations. This is found on top of the staking page.
                  </p>
                </div>
                <hr className="border-white" />

                {/* Your Stake */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <label className="font-semibold text-blue-600 mb-1">
                    Your $PRIZE Stake
                  </label>
                  <Input
                    type="text"
                    value={formatInputValue(userStake)}
                    onChange={(e) => setUserStake(parseInputValue(e.target.value))}
                    className="text-black"
                    style={{ fontSize: '1.3rem', padding: '10px', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }}
                  />
                  <p style={{ fontSize: '1rem', color: 'black', margin: '0.5rem 0' }}>
                    Add your inquiry amount.
                  </p>
                </div>
                <hr className="border-white" />

                {/* Token Price */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <label className="font-semibold text-blue-600 mb-1">
                    $PRIZE Token Price (USD)
                  </label>
                  <Input
                    type="number"
                    value={tokenPrice}
                    onChange={(e) => setTokenPrice(parseFloat(e.target.value) || 0)}
                    className="text-black"
                    style={{ fontSize: '1.3rem', padding: '10px', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }}
                  />
                  <p style={{ fontSize: '1rem', color: 'black', margin: '0.5rem 0' }}>
                    Add the current price of $PRIZE.
                  </p>
                </div>
                <hr className="border-white" />

                {/* Industry Revenue Capture */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <label className="font-semibold text-blue-600 mb-2">
                    Industry Revenue Capture (% of $400B)
                  </label>
                  <Slider
                    min={2}
                    max={100}
                    step={1}
                    value={[industryPercent]}
                    onValueChange={(val) => setIndustryPercent(val[0])}
                    className="slider-field"
                  />
                  <div className="mt-2">{industryPercent}%</div>
                  <p style={{ fontSize: '1rem', color: 'black', margin: '0.5rem 0' }}>
                    Adjust the slider to see the potential market capture Prize AI Technologies could achieve. (@ 3 cents per dollar fee)
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Results Panel (green) */}
          <div className="green-box results" style={{ width: '100%', border: '2px solid white', borderRadius: '0 0 20px 20px', padding: '1rem' }}>
            <div className="text-2xl font-bold text-center text-white" style={{ fontSize: '2.5rem' }}>
              RESULTS
            </div>
            <hr className="border-white mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Annual Income */}
              <div>
                <strong style={{ fontSize: '1.2em' }}>Your Annual Income (USD):</strong>
                <div style={{ color: '#1427B8', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  ${formatNumber(userRevenue, 2)}
                </div>
              </div>
              {/* APY */}
              <div>
                <strong style={{ fontSize: '1.2em' }}>APY (%):</strong>
                <div style={{ color: '#1427B8', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {formatNumber(apyPercent, 2)}%
                </div>
              </div>
              {/* Cost of Purchase */}
              <div>
                <strong style={{ fontSize: '1.2em' }}>Cost of Purchase (USD):</strong>
                <div style={{ color: '#1427B8', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  ${formatNumber(purchaseCost, 2)}
                </div>
              </div>
              {/* Estimated Price */}
              <div>
                <strong style={{ fontSize: '1.2em' }}>Estimated Price @ 20% APR (USD):</strong>
                <div style={{ color: '#1427B8', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  ${formatNumber(tokenPriceFor20APR, 2)}
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'black', textAlign: 'center', marginBottom: '1rem' }}>
              Results are estimated based on the captured market share from the $400 billion industry slider @ 3 cents per dollar fee, the total $PRIZE staked pool & your $PRIZE stake inquiry. The estimated price result is calculated buy assuming the market share value x the total PRIZE pool x a fair value with the expectations with earning a nice 20% APR.
            </p>
            <div style={{ textAlign: 'center' }}>
              <button onClick={() => window.open('https://www.prizetech.xyz/buy-prize-ico', '_blank')} className="button" style={{ padding: '12px 48px' }}>
                BUY $PRIZE
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

