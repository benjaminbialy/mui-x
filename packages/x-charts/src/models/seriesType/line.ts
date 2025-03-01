import { DefaultizedProps } from '../helpers';
import {
  CartesianSeriesType,
  CommonDefaultizedProps,
  CommonSeriesType,
  StackableSeriesType,
} from './common';

export type CurveType =
  | 'catmullRom'
  | 'linear'
  | 'monotoneX'
  | 'monotoneY'
  | 'natural'
  | 'step'
  | 'stepBefore'
  | 'stepAfter';

export interface ShowMarkParams<AxisValue = number | Date> {
  /**
   * The item index.
   */
  index: number;
  /**
   * The x coordinate in the SVG.
   */
  x: number;
  /**
   * The y coordinate in the SVG.
   */
  y: number;
  /**
   * The item position value. It likely comes from the axis `data` property.
   */
  position: AxisValue;
  /**
   * The item value. It comes from the series `data` property.
   */
  value: number;
}

export interface LineSeriesType
  extends CommonSeriesType<number>,
    CartesianSeriesType,
    StackableSeriesType {
  type: 'line';
  /**
   * Data associated to the line.
   */
  data?: number[];
  /**
   * The key used to retrive data from the dataset.
   */
  dataKey?: string;
  stack?: string;
  area?: boolean;
  label?: string;
  curve?: CurveType;
  /**
   * Define which items of the series should display a mark.
   * If can be a boolean that applies to all items.
   * Or a callback that gets some item properties and returns true if the item should be displayed.
   */
  showMark?: boolean | ((params: ShowMarkParams) => boolean);
  /**
   * Do not render the line highlight item if set to `true`.
   * @default false
   */
  disableHighlight?: boolean;
}

/**
 * An object that allows to identify a single line.
 * Used for item interaction
 */
export type LineItemIdentifier = {
  type: 'line';
  seriesId: DefaultizedLineSeriesType['id'];
  /**
   * `dataIndex` can be `undefined` if the mouse is over the area and not a specific item.
   */
  dataIndex?: number;
};

export interface DefaultizedLineSeriesType
  extends DefaultizedProps<LineSeriesType, CommonDefaultizedProps | 'color'> {}
