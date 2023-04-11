declare module "index" {
    import { Matrix, Point, Texture } from '@pixi/core';
    import { Graphics, LINE_CAP, LINE_JOIN } from '@pixi/graphics';
    /** Define the dash: [dash length, gap size, dash size, gap size, ...] */
    export type Dashes = number[];
    export interface DashLineOptions {
        dash?: Dashes;
        width?: number;
        color?: number;
        alpha?: number;
        scale?: number;
        useTexture?: boolean;
        useDots?: boolean;
        cap?: LINE_CAP;
        join?: LINE_JOIN;
        alignment?: number;
    }
    export class DashLine {
        graphics: Graphics;
        /** current length of the line */
        lineLength: number;
        /** cursor location */
        cursor: Point;
        /** desired scale of line */
        scale: number;
        private activeTexture;
        private start;
        private dashSize;
        private dash;
        private useTexture;
        private options;
        static dashTextureCache: Record<string, Texture>;
        /**
         * Create a DashLine
         * @param graphics
         * @param [options]
         * @param [options.useTexture=false] - use the texture based render (useful for very large or very small dashed lines)
         * @param [options.dash=[10,5] - an array holding the dash and gap (eg, [10, 5, 20, 5, ...])
         * @param [options.width=1] - width of the dashed line
         * @param [options.alpha=1] - alpha of the dashed line
         * @param [options.color=0xffffff] - color of the dashed line
         * @param [options.cap] - add a LINE_CAP style to dashed lines (only works for useTexture: false)
         * @param [options.join] - add a LINE_JOIN style to the dashed lines (only works for useTexture: false)
         * @param [options.alignment] - The alignment of any lines drawn (0.5 = middle, 1 = outer, 0 = inner)
         */
        constructor(graphics: Graphics, options?: DashLineOptions);
        /** resets line style to enable dashed line (useful if lineStyle was changed on graphics element) */
        setLineStyle(): void;
        private static distance;
        moveTo(x: number, y: number): this;
        lineTo(x: number, y: number, closePath?: boolean): this;
        closePath(): void;
        drawCircle(x: number, y: number, radius: number, points?: number, matrix?: Matrix): this;
        drawEllipse(x: number, y: number, radiusX: number, radiusY: number, points?: number, matrix?: Matrix): this;
        drawPolygon(points: Point[] | number[], matrix?: Matrix): this;
        drawRect(x: number, y: number, width: number, height: number, matrix?: Matrix): this;
        private adjustLineStyle;
        private static getTexture;
    }
}
//# sourceMappingURL=index.d.ts.map