using System.Net;
using System.Runtime.Serialization;

namespace Umbraco.Cms.Core.Media.EmbedProviders;

/// <summary>
///     Base class for OEmbed response.
/// </summary>
[DataContract]
public abstract class OEmbedResponseBase<T>
{
    [DataMember(Name = "type")]
    public string? Type { get; set; }

    [DataMember(Name = "version")]
    public string? Version { get; set; }

    [DataMember(Name = "title")]
    public string? Title { get; set; }

    [DataMember(Name = "author_name")]
    public string? AuthorName { get; set; }

    [DataMember(Name = "author_url")]
    public string? AuthorUrl { get; set; }

    [DataMember(Name = "provider_name")]
    public string? ProviderName { get; set; }

    [DataMember(Name = "provider_url")]
    public string? ProviderUrl { get; set; }

    [DataMember(Name = "thumbnail_url")]
    public string? ThumbnailUrl { get; set; }

    [DataMember(Name = "thumbnail_height")]
    public virtual T? ThumbnailHeight { get; set; }

    [DataMember(Name = "thumbnail_width")]
    public T? ThumbnailWidth { get; set; }

    [DataMember(Name = "html")]
    public string? Html { get; set; }

    [DataMember(Name = "url")]
    public string? Url { get; set; }

    [DataMember(Name = "height")]
    public T? Height { get; set; }

    [DataMember(Name = "width")]
    public T? Width { get; set; }

    /// <summary>
    ///     Gets the HTML.
    /// </summary>
    /// <returns>The response HTML</returns>
    public string GetHtml()
    {
        if (Type == "photo")
        {
            return "<img src=\"" + Url + "\" width=\"" + Width + "\" height=\"" + Height + "\" alt=\"" +
                   WebUtility.HtmlEncode(Title) + "\" />";
        }

        return string.IsNullOrEmpty(Html) == false ? Html : string.Empty;
    }
}
