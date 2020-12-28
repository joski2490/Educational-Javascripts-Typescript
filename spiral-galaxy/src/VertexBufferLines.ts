import { Vec3, Color, VertexColor } from './Types'
import { VertexBufferBase, AttributeDefinition } from './VertexBufferBase'

export class VertexBufferLines extends VertexBufferBase<VertexColor>
{
    private lineWidth : number = 1;
    private readonly attPosition : number = 0;
    private readonly attColor : number = 1;

	constructor(gl : WebGLRenderingContext, lineWidth : number, bufferMode : number)
	{
        super(gl, bufferMode);
        this.lineWidth = lineWidth;
        
		this.defineAttributes([ 
			new AttributeDefinition(this.attPosition, 3, gl.FLOAT, 0),
			new AttributeDefinition(this.attColor,    4, gl.FLOAT, Object.keys(Vec3).length)
        ]);
    }
    
	protected onBeforeDraw() : void 
	{
		this.gl.lineWidth(this.lineWidth);
    }
    
	protected getVertexShaderSource() : string
	{
        return `
			uniform mat4 projMat;
			uniform mat4 viewMat;
			layout(location = 0) in vec3 position;
			layout(location = 1) in vec4 color;
			out vec4 vertexColor;
			void main()
			{
				gl_Position =  projMat * vec4(position, 1);
				vertexColor = color;
			}`;
	}

    protected getFragmentShaderSource() : string
	{
		return `
			out vec4 FragColor;
			in vec4 vertexColor;
			void main()
			{
				FragColor = vertexColor;
			}`;
	}
}
