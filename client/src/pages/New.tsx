import { Link } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, ChevronDown, ArrowLeft, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";

const PRODUCT_TYPES = ["Pad", "Tampon", "Liner", "Cup", "Other"];

export function NewProduct() {
  const [formData, setFormData] = useState({
    brand: "",
    name: "",
    type: "",
    safetyScore: "",
    ingredients: "",
    imageUrl: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.brand.trim()) newErrors.brand = "Brand name is required.";
    if (!formData.name.trim()) newErrors.name = "Product name is required.";
    if (!formData.type) newErrors.type = "Please select a product type.";
    if (!formData.ingredients.trim())
      newErrors.ingredients = "At least one ingredient is required.";
    return newErrors;
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative pt-16 pb-20 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] rounded-full bg-secondary/30 blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
            <Link href="/">
              <a className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                Back to products
              </a>
            </Link>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight max-w-3xl mb-4"
            >
              Add a{" "}
              <span className="text-gradient">New Product</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl"
            >
              Submit a feminine care product so others can see its ingredients
              and safety information.
            </motion.p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 bg-muted/30 border-t border-border/50">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl border border-border shadow-sm p-14 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <PlusCircle className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Product Submitted!
                </h2>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        brand: "",
                        name: "",
                        type: "",
                        safetyScore: "",
                        ingredients: "",
                        imageUrl: "",
                      });
                    }}
                    className="px-7 py-3 rounded-full bg-primary text-primary-foreground font-bold shadow-md hover:bg-primary/90 active:scale-95 transition-all"
                  >
                    Add Another
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3 }}
                className="bg-white rounded-3xl border border-border shadow-sm p-8 md:p-10 space-y-7"
              >
                {/* Brand & Product Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field
                    label="Brand: "
                    error={errors.brand}
                  >
                    <input
                      name="Brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="Insert brand name"
                      className={inputCls(!!errors.brand)}
                    />
                  </Field>
                  <Field label="Product Name: " error={errors.name}>
                    <input
                      name="Name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Insert product name"
                      className={inputCls(!!errors.name)}
                    />
                  </Field>
                </div>

                {/* Ingredients */}
                <Field
                  label="Ingredients *"
                  hint="Comma-separated list from the product label."
                  error={errors.ingredients}
                >
                  <textarea
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Paste indgreints list here"
                    className={inputCls(!!errors.ingredients)}
                  />
                </Field>

                {/* Image URL */}
                <Field
                  label="Product Image URL (optional)"
                  hint="A direct link to a product photo."
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground">
                      <Upload className="w-4 h-4" />
                    </div>
                    <input
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/product.jpg"
                      className={`${inputCls(false)} pl-11`}
                    />
                  </div>
                </Field>

                {/* Submit */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 py-4 rounded-full bg-primary text-primary-foreground font-bold text-base shadow-md hover:bg-primary/90 hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Submit Product
                  </button>
                  <Link href="/">
                    <a className="flex-1 py-4 rounded-full bg-secondary text-secondary-foreground font-semibold text-base text-center hover:bg-secondary/80 transition-colors">
                      Cancel
                    </a>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

/* Helpers */

function inputCls(hasError: boolean) {
  return [
    "w-full px-4 py-3 rounded-xl bg-muted/40 border text-foreground placeholder:text-muted-foreground",
    "focus:outline-none focus:ring-4 transition-all duration-200 resize-none",
    hasError
      ? "border-destructive focus:border-destructive focus:ring-destructive/10"
      : "border-border focus:border-primary focus:ring-primary/10",
  ].join(" ");
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      {hint && <p className="text-xs text-muted-foreground -mt-1">{hint}</p>}
      {children}
      {error && <p className="text-xs text-destructive font-medium">{error}</p>}
    </div>
  );
}