import type {
  ScaleBand,
  ScaleLogarithmic,
  ScalePower,
  ScaleTime,
  ScaleLinear,
  ScalePoint,
} from 'd3-scale';
import { ChartsAxisClasses } from '../ChartsAxis/axisClasses';
import type { TickParams } from '../hooks/useTicks';
import { ChartsTextProps } from '../internals/components/ChartsText';

export type D3Scale =
  | ScaleBand<any>
  | ScaleLogarithmic<any, number>
  | ScalePoint<any>
  | ScalePower<any, number>
  | ScaleTime<any, number>
  | ScaleLinear<any, number>;

export type D3ContinuouseScale =
  | ScaleLogarithmic<any, number>
  | ScalePower<any, number>
  | ScaleTime<any, number>
  | ScaleLinear<any, number>;

export interface ChartsAxisSlotsComponent {
  axisLine?: React.JSXElementConstructor<React.SVGAttributes<SVGPathElement>>;
  axisTick?: React.JSXElementConstructor<React.SVGAttributes<SVGPathElement>>;
  axisTickLabel?: React.JSXElementConstructor<ChartsTextProps>;
  axisLabel?: React.JSXElementConstructor<ChartsTextProps>;
}

export interface ChartsAxisSlotComponentProps {
  axisLine?: Partial<React.SVGAttributes<SVGPathElement>>;
  axisTick?: Partial<React.SVGAttributes<SVGPathElement>>;
  axisTickLabel?: Partial<ChartsTextProps>;
  axisLabel?: Partial<ChartsTextProps>;
}

export interface ChartsAxisProps extends TickParams {
  /**
   * Id of the axis to render.
   */
  axisId: string;
  /**
   * If true, the axis line is disabled.
   * @default false
   */
  disableLine?: boolean;
  /**
   * If true, the ticks are disabled.
   * @default false
   */
  disableTicks?: boolean;
  /**
   * The fill color of the axis text.
   * @default 'currentColor'
   */
  fill?: string;
  /**
   * The font size of the axis ticks text.
   * @default 12
   * @deprecated Consider using `tickLabelStyle.fontSize` instead.
   */
  tickFontSize?: number;
  /**
   * The style applied to ticks text.
   */
  tickLabelStyle?: ChartsTextProps['style'];
  /**
   * The style applied to the axis label.
   */
  labelStyle?: ChartsTextProps['style'];
  /**
   * Defines which ticks get its label displayed. Its value can be:
   * - 'auto' In such case, labels are displayed if they do not overlap with the previous one.
   * - a filtering function of the form (value, index) => boolean. Warning: the index is tick index, not data ones.
   * @default 'auto'
   */
  tickLabelInterval?: 'auto' | ((value: any, index: number) => boolean);
  /**
   * The label of the axis.
   */
  label?: string;
  /**
   * The font size of the axis label.
   * @default 14
   * @deprecated Consider using `labelStyle.fontSize` instead.
   */
  labelFontSize?: number;
  /**
   * The stroke color of the axis line.
   * @default 'currentColor'
   */
  stroke?: string;
  /**
   * The size of the ticks.
   * @default 6
   */
  tickSize?: number;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ChartsAxisClasses>;
  /**
   * Overridable component slots.
   * @default {}
   */
  slots?: Partial<ChartsAxisSlotsComponent>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps?: Partial<ChartsAxisSlotComponentProps>;
}

export interface ChartsYAxisProps extends ChartsAxisProps {
  /**
   * Position of the axis.
   */
  position?: 'left' | 'right';
}

export interface ChartsXAxisProps extends ChartsAxisProps {
  /**
   * Position of the axis.
   */
  position?: 'top' | 'bottom';
}

export type ScaleName = 'linear' | 'band' | 'point' | 'log' | 'pow' | 'sqrt' | 'time' | 'utc';
export type ContinuouseScaleName = 'linear' | 'log' | 'pow' | 'sqrt' | 'time' | 'utc';

interface AxisScaleConfig {
  band: {
    scaleType: 'band';
    scale: ScaleBand<any>;
    /**
     * The ratio between the space allocated for padding between two categories and the category width.
     * 0 means no gap, and 1 no data.
     * @default 0.2
     */
    categoryGapRatio: number;
    /**
     * The ratio between the width of a bar, and the gap between two bars.
     * 0 means no gap, and 1 no bar.
     * @default 0.1
     */
    barGapRatio: number;
  };
  point: {
    scaleType: 'point';
    scale: ScalePoint<any>;
  };
  log: {
    scaleType: 'log';
    scale: ScaleLogarithmic<any, any>;
  };
  pow: {
    scaleType: 'pow';
    scale: ScalePower<any, any>;
  };
  sqrt: {
    scaleType: 'sqrt';
    scale: ScalePower<any, any>;
  };
  time: {
    scaleType: 'time';
    scale: ScaleTime<any, any>;
  };
  utc: {
    scaleType: 'utc';
    scale: ScaleTime<any, any>;
  };
  linear: {
    scaleType: 'linear';
    scale: ScaleLinear<any, any>;
  };
}

export type AxisConfig<S extends ScaleName = ScaleName, V = any> = {
  id: string;
  min?: number | Date;
  max?: number | Date;
  data?: V[];
  /**
   * The key used to retrieve data from the dataset prop.
   */
  dataKey?: string;
  valueFormatter?: (value: V) => string;
  /**
   * If `true`, hide this value in the tooltip
   */
  hideTooltip?: boolean;
} & Partial<ChartsXAxisProps | ChartsYAxisProps> &
  Partial<Omit<AxisScaleConfig[S], 'scale'>> &
  TickParams;

export type AxisDefaultized<S extends ScaleName = ScaleName, V = any> = Omit<
  AxisConfig<S, V>,
  'scaleType'
> &
  AxisScaleConfig[S] & {
    tickNumber: number;
  };

export function isBandScaleConfig(
  scaleConfig: AxisConfig<ScaleName>,
): scaleConfig is AxisConfig<'band'> & { scaleType: 'band' } {
  return scaleConfig.scaleType === 'band';
}

export function isPointScaleConfig(
  scaleConfig: AxisConfig<ScaleName>,
): scaleConfig is AxisConfig<'point'> & { scaleType: 'point' } {
  return scaleConfig.scaleType === 'point';
}
