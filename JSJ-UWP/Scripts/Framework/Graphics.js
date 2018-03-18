﻿class Graphics
{
	constructor()
	{
		const canv = document.getElementById( "Game" );
		const ctx = canv.getContext( "2d" );

		let images = [];

		this.ScreenWidth = canv.width;
		this.ScreenHeight = canv.height;
		// this.ScreenRect = new Rect( 0,0,canv.width,canv.height );
		// 
		this.Initialize = () =>
		{
			ctx.imageSmoothingEnabled = false;
			ctx.webkitImageSmoothingEnabled = false;
			ctx.mozImageSmoothingEnabled = false;

			canv.width = window.innerWidth;
			canv.height = window.innerHeight;
			this.ScreenWidth = canv.width;
			this.ScreenHeight = canv.height;
		}

		this.GetCanvas = () =>
		{
			return canv;
		}

		this.GetContext = () =>
		{
			return ctx;
		}

		this.LoadImage = ( url ) =>
		{
			for( let i = 0; i < images.length; ++i )
			{
				const temp = new Image();
				temp.src = url;
				if( images[i].src == temp.src )
				{
					return i;
				}
			}

			images.push( new Image() );
			images[images.length - 1].src = url;

			return ( images.length - 1 );
		}

		this.DrawImage = ( index,x = 0,y = 0,width = 0,height = 0 ) =>
		{
			if( width != 0 && height != 0 )
			{
				ctx.drawImage( images[index],x,y,width,height );
			}
			else
			{
				ctx.drawImage( images[index],x,y );
			}
		}

		this.DrawRect = ( x,y,width,height,color ) =>
		{
			ctx.fillStyle = color;
			ctx.fillRect( x,y,width,height );
		}

		this.DrawCircle = ( x,y,radius,color ) =>
		{
			ctx.fillStyle = color;

			ctx.beginPath();
			ctx.arc( x,y,radius,0,2 * Math.PI );
			ctx.fill();
		}

		this.DrawGrad = ( x,y,width,height,colors ) =>
		{
			let grad = ctx.createLinearGradient( x,y,x + width,y + height );

			const stopAddAmount = 1.0 / colors.length;
			let amount = 0.0;
			for( let i = 0; i < colors.length; ++i )
			{
				grad.addColorStop( amount,colors[i] );
				amount += stopAddAmount;
			}

			ctx.fillStyle = grad;
			ctx.fillRect( x,y,width,height );
		}

		this.DrawText = ( x,y,font,color,msg ) =>
		{
			ctx.fillStyle = color;
			ctx.font = font;
			ctx.fillText( msg,x,y );
		}

		window.onresize = () =>
		{
			canv.width = window.innerWidth;
			canv.height = window.innerHeight;
			this.ScreenWidth = canv.width;
			this.ScreenHeight = canv.height;
		}
	}
}